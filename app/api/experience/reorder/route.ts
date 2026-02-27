import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const owner = await prisma.person.findFirst();
  if (!owner) {
    return NextResponse.json({ message: "No owner found" }, { status: 404 });
  }

  try {
    const { orderedIds } = await req.json();

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json(
        { message: "orderedIds must be a non-empty array" },
        { status: 400 }
      );
    }

    // Use a transaction to update all sort orders atomically
    await prisma.$transaction(
      orderedIds.map((id: string, index: number) =>
        prisma.experience.update({
          where: { id, personId: owner.id },
          data: { sortOrder: index },
        })
      )
    );

    return NextResponse.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Failed to reorder experiences:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
