import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const owner = await prisma.person.findFirst();
  if (!owner) {
    return NextResponse.json({ message: "No owner found" }, { status: 404 });
  }

  try {
    const { featuredIds, regularIds } = await req.json();

    if (!Array.isArray(featuredIds) || !Array.isArray(regularIds)) {
      return NextResponse.json(
        { message: "featuredIds and regularIds must be arrays" },
        { status: 400 }
      );
    }

    // Use a transaction to update all sort orders and featured status atomically
    const operations = [
      ...featuredIds.map((id: string, index: number) =>
        prisma.project.update({
          where: { id, personId: owner.id },
          data: { sortOrder: index, featured: true },
        })
      ),
      ...regularIds.map((id: string, index: number) =>
        prisma.project.update({
          where: { id, personId: owner.id },
          data: { sortOrder: index, featured: false },
        })
      ),
    ];

    await prisma.$transaction(operations);

    return NextResponse.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Failed to reorder projects:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
