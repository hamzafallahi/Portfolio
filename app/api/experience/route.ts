import { getConnection } from "@/lib/oracle";
import { NextRequest, NextResponse } from "next/server";

// Owner ID constant - all operations are scoped to this person
const OWNER_ID = 1;

export async function GET() {
  const conn = await getConnection();

  const result = await conn.execute(`
    SELECT e.id,
           e.company,
           e.role,
           e.period,
           e.description,
           e.link
    FROM experience_tab e
    WHERE e.owner = (SELECT REF(p) FROM person_tab p WHERE p.id = :ownerId)
    ORDER BY e.id
  `, { ownerId: OWNER_ID });

  const experiences = [];
  for (const exp of result.rows as any[]) { // eslint-disable-line @typescript-eslint/no-explicit-any
    const techResult = await conn.execute(`
      SELECT * FROM TABLE(SELECT technologies FROM experience_tab WHERE id = :id)
    `, [exp.ID]);
    const technologies = techResult.rows?.map((r: any) => r.NAME) || []; // eslint-disable-line @typescript-eslint/no-explicit-any

    const achResult = await conn.execute(`
      SELECT * FROM TABLE(SELECT achievements FROM experience_tab WHERE id = :id)
    `, [exp.ID]);
    const achievements = achResult.rows?.map((r: any) => r.DESCRIPTION) || []; // eslint-disable-line @typescript-eslint/no-explicit-any

    experiences.push({
      id: exp.ID,
      company: exp.COMPANY,
      role: exp.ROLE,
      period: exp.PERIOD,
      description: exp.DESCRIPTION,
      link: exp.LINK,
      technologies,
      achievements,
    });
  }

  await conn.close();

  return NextResponse.json(experiences);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const conn = await getConnection();

  try {
    // Get next ID
    const idResult = await conn.execute(`SELECT NVL(MAX(id), 0) + 1 as next_id FROM experience_tab`);
    const nextId = (idResult.rows![0] as any).NEXT_ID; // eslint-disable-line @typescript-eslint/no-explicit-any

    await conn.execute(`
      INSERT INTO experience_tab VALUES (
        experience_t(
          :id,
          :company,
          :role,
          :period,
          :description,
          :link,
          technology_list_t(), -- empty initially
          achievement_list_t(), -- empty initially
          (SELECT REF(p) FROM person_tab p WHERE p.id = 1)
        )
      )
    `, {
      id: nextId,
      company: data.company,
      role: data.role,
      period: data.period,
      description: data.description,
      link: data.link,
    });

    // Insert technologies
    if (data.technologies && data.technologies.length > 0) {
      for (const tech of data.technologies) {
        await conn.execute(
          `INSERT INTO TABLE(SELECT technologies FROM experience_tab WHERE id = :id) VALUES (technology_t(:tech))`,
          [nextId, tech]
        );
      }
    }

    // Insert achievements
    if (data.achievements && data.achievements.length > 0) {
      for (const ach of data.achievements) {
        await conn.execute(
          `INSERT INTO TABLE(SELECT achievements FROM experience_tab WHERE id = :id) VALUES (achievement_t(:ach))`,
          [nextId, ach]
        );
      }
    }

    await conn.commit();
    await conn.close();

    return NextResponse.json({ message: "Experience created successfully" }, { status: 201 });
  } catch (error) {
    await conn.rollback();
    await conn.close();
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}