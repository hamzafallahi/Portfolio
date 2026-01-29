import { getConnection } from "@/lib/oracle";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const conn = await getConnection();

  const result = await conn.execute(`
    SELECT p.id,
           p.full_name,
           p.title,
           p.bio,
           p.email,
           p.phone,
           p.location,
           p.image_url,
           p.technology_tags,
           p.social_links
    FROM person_tab p
    WHERE p.id = 1
  `);

  if (result.rows?.length === 0) {
    return NextResponse.json({ message: "Person not found" }, { status: 404 });
  }

  const person = result.rows![0] as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  // Process nested tables
  const techResult = await conn.execute(`
    SELECT * FROM TABLE(SELECT technology_tags FROM person_tab WHERE id = 1)
  `);
  const technology_tags = techResult.rows?.map((r: any) => r.NAME) || []; // eslint-disable-line @typescript-eslint/no-explicit-any

  // Map to lowercase keys
  const mappedPerson = {
    id: person.ID,
    full_name: person.FULL_NAME,
    title: person.TITLE,
    bio: person.BIO,
    email: person.EMAIL,
    phone: person.PHONE,
    location: person.LOCATION,
    image_url: person.IMAGE_URL,
    technology_tags,
    social_links: {
      github: person.SOCIAL_LINKS.GITHUB,
      linkedin: person.SOCIAL_LINKS.LINKEDIN,
      facebook: person.SOCIAL_LINKS.FACEBOOK,
      codeforces: person.SOCIAL_LINKS.CODEFORCES,
    },
  };

  await conn.close();

  return NextResponse.json(mappedPerson);
}

export async function PATCH(req: NextRequest) {
  const data = await req.json();
  const conn = await getConnection();

  try {
    // Update main fields
    await conn.execute(`
      UPDATE person_tab SET
        full_name = :full_name,
        title = :title,
        bio = :bio,
        email = :email,
        phone = :phone,
        location = :location,
        image_url = :image_url,
        social_links = social_links_t(:github, :linkedin, :facebook, :codeforces)
      WHERE id = 1
    `, {
      full_name: data.full_name,
      title: data.title,
      bio: data.bio,
      email: data.email,
      phone: data.phone,
      location: data.location,
      image_url: data.image_url,
      github: data.social_links?.github,
      linkedin: data.social_links?.linkedin,
      facebook: data.social_links?.facebook,
      codeforces: data.social_links?.codeforces,
    });

    // Update technology_tags: delete old and insert new
    await conn.execute(`DELETE FROM TABLE(SELECT technology_tags FROM person_tab WHERE id = 1)`);

    if (data.technology_tags && data.technology_tags.length > 0) {
      for (const tag of data.technology_tags) {
        await conn.execute(
          `INSERT INTO TABLE(SELECT technology_tags FROM person_tab WHERE id = 1) VALUES (technology_t(:tag))`,
          [tag]
        );
      }
    }

    await conn.commit();
    await conn.close();

    return NextResponse.json({ message: "Person updated successfully" });
  } catch (error) {
    await conn.rollback();
    await conn.close();
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}