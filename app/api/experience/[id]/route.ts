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
      UPDATE experience_tab SET
        company = :company,
        role = :role,
        period = :period,
        description = :description,
        link = :link
      WHERE id = :id
        AND owner = (SELECT REF(p) FROM person_tab p WHERE p.id = :ownerId)
    `, {
      id,
      company: data.company,
      role: data.role,
      period: data.period,
      description: data.description,
      link: data.link,      ownerId: OWNER_ID,    });

    // Update technologies: delete and insert
    await conn.execute(`DELETE FROM TABLE(SELECT technologies FROM experience_tab WHERE id = :id)`, [id]);

    if (data.technologies && data.technologies.length > 0) {
      for (const tech of data.technologies) {
        await conn.execute(
          `INSERT INTO TABLE(SELECT technologies FROM experience_tab WHERE id = :id) VALUES (technology_t(:tech))`,
          [id, tech]
        );
      }
    }

    // Update achievements
    await conn.execute(`DELETE FROM TABLE(SELECT achievements FROM experience_tab WHERE id = :id)`, [id]);

    if (data.achievements && data.achievements.length > 0) {
      for (const ach of data.achievements) {
        await conn.execute(
          `INSERT INTO TABLE(SELECT achievements FROM experience_tab WHERE id = :id) VALUES (achievement_t(:ach))`,
          [id, ach]
        );
      }
    }

    await conn.commit();
    await conn.close();

    return NextResponse.json({ message: "Experience updated successfully" });
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
      `DELETE FROM experience_tab WHERE id = :id AND owner = (SELECT REF(p) FROM person_tab p WHERE p.id = :ownerId)`,
      { id, ownerId: OWNER_ID },
      { autoCommit: true }
    );
    await conn.close();

    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error) {
    await conn.close();
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}