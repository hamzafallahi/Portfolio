import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const owner = await prisma.person.findFirst();
  if (!owner) {
    return NextResponse.json({ message: "No owner found" }, { status: 404 });
  }

  try {
    const msg = await prisma.contactMessage.findFirst({
      where: { id, personId: owner.id },
    });

    if (!msg) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: msg.id,
      sender_name: msg.senderName,
      sender_email: msg.senderEmail,
      subject: msg.subject,
      message: msg.message,
      sent_at: msg.sentAt,
    });
  } catch (error) {
    console.error("Error fetching message:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await req.json();

  const owner = await prisma.person.findFirst();
  if (!owner) {
    return NextResponse.json({ message: "No owner found" }, { status: 404 });
  }

  try {
    await prisma.contactMessage.update({
      where: { id, personId: owner.id },
      data: {
        subject: data.subject,
        message: data.message,
      },
    });

    return NextResponse.json({ message: "Message updated successfully" });
  } catch (error) {
    console.error("Error updating message:", error);
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
    await prisma.contactMessage.delete({
      where: { id, personId: owner.id },
    });

    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}