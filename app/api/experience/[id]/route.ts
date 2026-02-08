import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const data = await req.json();
  const { id } = await params;

  const owner = await prisma.person.findFirst();
  if (!owner) {
    return NextResponse.json({ message: "No owner found" }, { status: 404 });
  }

  try {
    await prisma.experience.update({
      where: { id, personId: owner.id },
      data: {
        company: data.company,
        role: data.role,
        period: data.period,
        description: data.description,
        link: data.link,
        technologies: data.technologies || [],
        achievements: data.achievements || [],
      },
    });

    return NextResponse.json({ message: "Experience updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const owner = await prisma.person.findFirst();
  if (!owner) {
    return NextResponse.json({ message: "No owner found" }, { status: 404 });
  }

  try {
    await prisma.experience.delete({
      where: { id, personId: owner.id },
    });

    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}