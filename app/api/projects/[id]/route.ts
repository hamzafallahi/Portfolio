import { getConnection } from "@/lib/oracle";
import { NextRequest, NextResponse } from "next/server";

// Owner ID constant - all operations are scoped to this person
const OWNER_ID = 1;

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const data = await req.json();
  const { id } = await params;

  const conn = await getConnection();

  try {
    await conn.execute(`
      UPDATE project_tab SET
        title = :title,
        description = :description,
        image_url = :image_url,
        github_url = :github_url,
        demo_url = :demo_url,
        linkedin_post = :linkedin_post,
        featured = :featured
      WHERE id = :id
        AND owner = (SELECT REF(p) FROM person_tab p WHERE p.id = :ownerId)
    `, {
      id,
      title: data.title,
      description: data.description,
      image_url: data.image,
      github_url: data.github,
      demo_url: data.demo,
      linkedin_post: data.linkedinPost,
      featured: data.featured ? 'Y' : 'N',      ownerId: OWNER_ID,    });

    // Update tags: delete and insert
    await conn.execute(`DELETE FROM TABLE(SELECT tags FROM project_tab WHERE id = :id)`, [id]);

    if (data.tags && data.tags.length > 0) {
      for (const tag of data.tags) {
        await conn.execute(
          `INSERT INTO TABLE(SELECT tags FROM project_tab WHERE id = :id) VALUES (technology_t(:tag))`,
          [id, tag]
        );
      }
    }

    await conn.commit();
    await conn.close();

    return NextResponse.json({ message: "Project updated successfully" });
  } catch (error) {
    await conn.rollback();
    await conn.close();
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const conn = await getConnection();

  try {
    await conn.execute(
      `DELETE FROM project_tab WHERE id = :id AND owner = (SELECT REF(p) FROM person_tab p WHERE p.id = :ownerId)`,
      { id, ownerId: OWNER_ID },
      { autoCommit: true }
    );
    await conn.close();

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    await conn.close();
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}