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
    await prisma.project.update({
      where: { id, personId: owner.id },
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.image,
        githubUrl: data.github,
        demoUrl: data.demo,
        linkedinPost: data.linkedinPost,
        featured: !!data.featured,
        tags: data.tags || [],
      },
    });

    return NextResponse.json({ message: "Project updated successfully" });
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
    await prisma.project.delete({
      where: { id, personId: owner.id },
    });

    // Re-normalize sort orders after deletion for both sections
    for (const featured of [true, false]) {
      const remaining = await prisma.project.findMany({
        where: { personId: owner.id, featured },
        orderBy: { sortOrder: "asc" },
        select: { id: true },
      });
      if (remaining.length > 0) {
        await prisma.$transaction(
          remaining.map((proj, index) =>
            prisma.project.update({
              where: { id: proj.id },
              data: { sortOrder: index },
            })
          )
        );
      }
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}