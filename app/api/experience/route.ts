import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import type { Experience } from "@prisma/client";

export async function GET() {
  const owner = await prisma.person.findFirst();
  if (!owner) {
    return NextResponse.json({ message: "No owner found" }, { status: 404 });
  }

  const experiences = await prisma.experience.findMany({
    where: { personId: owner.id },
    orderBy: { sortOrder: "asc" },
  });

  const mapped = experiences.map((exp: Experience) => ({
    id: exp.id,
    company: exp.company,
    role: exp.role,
    period: exp.period,
    description: exp.description,
    link: exp.link,
    technologies: exp.technologies,
    achievements: exp.achievements,
    sortOrder: exp.sortOrder,
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
    // New items go to the end: find the current max sortOrder
    const maxSort = await prisma.experience.aggregate({
      where: { personId: owner.id },
      _max: { sortOrder: true },
    });
    const nextOrder = (maxSort._max.sortOrder ?? -1) + 1;

    await prisma.experience.create({
      data: {
        company: data.company,
        role: data.role,
        period: data.period,
        description: data.description,
        link: data.link,
        technologies: data.technologies || [],
        achievements: data.achievements || [],
        sortOrder: nextOrder,
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