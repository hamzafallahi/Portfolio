import { getConnection } from "@/lib/oracle";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const conn = await getConnection();

  const result = await conn.execute(
    `SELECT password_hash FROM admin_user WHERE username = :u`,
    [username]
  );

  if (result.rows?.length === 0) {
    return new Response("Invalid credentials", { status: 401 });
  }

  const hash = (result.rows![0] as any).PASSWORD_HASH; // eslint-disable-line @typescript-eslint/no-explicit-any
  const ok = await bcrypt.compare(password, hash);

  if (!ok) {
    return new Response("Invalid credentials", { status: 401 });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET!, {
    expiresIn: "2h",
  });

  return Response.json({ token });
}