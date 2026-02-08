import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const owner = await prisma.person.findFirst();
  if (!owner) {
    return NextResponse.json({ message: "No owner found" }, { status: 404 });
  }

  const experiences = await prisma.experience.findMany({
    where: { personId: owner.id },
    orderBy: { id: "asc" },
  });

  const mapped = experiences.map((exp) => ({
    id: exp.id,
    company: exp.company,
    role: exp.role,
    period: exp.period,
    description: exp.description,
    link: exp.link,
    technologies: exp.technologies,
    achievements: exp.achievements,
  }));

  return NextResponse.json(mapped);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const owner = await prisma.person.findFirst();
  if (!owner) {
    return NextResponse.json({ message: "No owner found" }, { status: 404 });
  }

  try {
    await prisma.experience.create({
      data: {
        company: data.company,
        role: data.role,
        period: data.period,
        description: data.description,
        link: data.link,
        technologies: data.technologies || [],
        achievements: data.achievements || [],
        personId: owner.id,
      },
    });

    return NextResponse.json(
      { message: "Experience created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}