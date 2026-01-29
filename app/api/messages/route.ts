import { getConnection } from "@/lib/oracle";
import { NextResponse } from "next/server";

export async function GET() {
  const conn = await getConnection();

  try {
    const result = await conn.execute(`
      SELECT id,
             sender_name,
             sender_email,
             subject,
             message,
             sent_at
      FROM contact_message_tab
      ORDER BY sent_at DESC
    `);

    const messages = result.rows?.map((row: any) => ({
      id: row.ID,
      sender_name: row.SENDER_NAME,
      sender_email: row.SENDER_EMAIL,
      subject: row.SUBJECT,
      message: row.MESSAGE,
      sent_at: row.SENT_AT,
    })) || [];

    await conn.close();

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}