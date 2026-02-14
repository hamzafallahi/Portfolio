import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { ContactMessage } from "@prisma/client";

export async function GET() {
  const owner = await prisma.person.findFirst();
  if (!owner) {
    return NextResponse.json({ message: "No owner found" }, { status: 404 });
  }

  try {
    const messages = await prisma.contactMessage.findMany({
      where: { personId: owner.id },
      orderBy: { sentAt: "desc" },
    });

    const mapped = messages.map((row: ContactMessage) => ({
      id: row.id,
      sender_name: row.senderName,
      sender_email: row.senderEmail,
      subject: row.subject,
      message: row.message,
      sent_at: row.sentAt,
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}