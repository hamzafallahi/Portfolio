import { getConnection } from "@/lib/oracle";

// Owner ID constant - all operations are scoped to this person
const OWNER_ID = 1;

export async function GET() {
  const conn = await getConnection();

  const result = await conn.execute(`
    SELECT p.id,
           p.title,
           p.description,
           p.image_url,
           p.github_url,
           p.demo_url,
           p.linkedin_post,
           p.featured
    FROM project_tab p
    WHERE p.owner = (SELECT REF(pr) FROM person_tab pr WHERE pr.id = :ownerId)
    ORDER BY p.id
  `, { ownerId: OWNER_ID });

  const projects = [];
  for (const proj of result.rows as any[]) { // eslint-disable-line @typescript-eslint/no-explicit-any
    const tagResult = await conn.execute(`
      SELECT * FROM TABLE(SELECT tags FROM project_tab WHERE id = :id)
    `, [proj.ID]);
    const tags = tagResult.rows?.map((r: any) => r.NAME) || []; // eslint-disable-line @typescript-eslint/no-explicit-any

    projects.push({
      id: proj.ID,
      title: proj.TITLE,
      description: proj.DESCRIPTION,
      image: proj.IMAGE_URL,
      github: proj.GITHUB_URL,
      demo: proj.DEMO_URL,
      linkedinPost: proj.LINKEDIN_POST,
      featured: proj.FEATURED === 'Y',
      tags,
    });
  }

  await conn.close();

  return Response.json(projects);
}





export async function POST(req: Request) {
  const data = await req.json();
  const conn = await getConnection();

  try {
    // Get next ID
    const idResult = await conn.execute(`SELECT NVL(MAX(id), 0) + 1 as next_id FROM project_tab`);
    const nextId = (idResult.rows![0] as any).NEXT_ID; // eslint-disable-line @typescript-eslint/no-explicit-any

    await conn.execute(
      `
      INSERT INTO project_tab VALUES (
        project_t(
          :id,
          :title,
          :description,
          :image_url,
          :github_url,
          :demo_url,
          :linkedin_post,
          :featured,
          technology_list_t(), -- empty initially
          (SELECT REF(p) FROM person_tab p WHERE p.id = 1)
        )
      )
      `,
      {
        id: nextId,
        title: data.title,
        description: data.description,
        image_url: data.image,
        github_url: data.github,
        demo_url: data.demo,
        linkedin_post: data.linkedinPost,
        featured: data.featured ? 'Y' : 'N',
      }
    );

    // Insert tags
    if (data.tags && data.tags.length > 0) {
      for (const tag of data.tags) {
        await conn.execute(
          `INSERT INTO TABLE(SELECT tags FROM project_tab WHERE id = :id) VALUES (technology_t(:tag))`,
          [nextId, tag]
        );
      }
    }

    await conn.commit();
    await conn.close();

    return new Response("Created", { status: 201 });
  } catch (error) {
    await conn.rollback();
    await conn.close();
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}