import { getConnection } from "@/lib/oracle";
import { NextRequest, NextResponse } from "next/server";

// Owner ID constant - all operations are scoped to this person
const OWNER_ID = 1;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const conn = await getConnection();

  try {
    const result = await conn.execute(
      `
      SELECT id,
             sender_name,
             sender_email,
             subject,
             message,
             sent_at
      FROM contact_message_tab
      WHERE id = :id
        AND owner = (SELECT REF(p) FROM person_tab p WHERE p.id = :ownerId)
    `,
      { id, ownerId: OWNER_ID }
    );

    if (result.rows?.length === 0) {
      return NextResponse.json({ message: "Message not found" }, { status: 404 });
    }

    const message = result.rows![0] as any;
    const mappedMessage = {
      id: message.ID,
      sender_name: message.SENDER_NAME,
      sender_email: message.SENDER_EMAIL,
      subject: message.SUBJECT,
      message: message.MESSAGE,
      sent_at: message.SENT_AT,
    };

    await conn.close();

    return NextResponse.json(mappedMessage);
  } catch (error) {
    console.error("Error fetching message:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await req.json();
  const conn = await getConnection();

  try {
    // For now, we'll allow updating subject and message
    // In a real app, you might want to restrict what can be updated
    await conn.execute(
      `
      UPDATE contact_message_tab
      SET subject = :subject,
          message = :message
      WHERE id = :id
        AND owner = (SELECT REF(p) FROM person_tab p WHERE p.id = :ownerId)
    `,
      {
        id,
        subject: data.subject,
        message: data.message,
        ownerId: OWNER_ID,
      }
    );

    await conn.commit();
    await conn.close();

    return NextResponse.json({ message: "Message updated successfully" });
  } catch (error) {
    await conn.rollback();
    await conn.close();
    console.error("Error updating message:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const conn = await getConnection();

  try {
    await conn.execute(
      `DELETE FROM contact_message_tab WHERE id = :id AND owner = (SELECT REF(p) FROM person_tab p WHERE p.id = :ownerId)`,
      { id, ownerId: OWNER_ID }
    );

    await conn.commit();
    await conn.close();

    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error) {
    await conn.rollback();
    await conn.close();
    console.error("Error deleting message:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}