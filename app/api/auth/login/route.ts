import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const user = await prisma.adminUser.findUnique({
    where: { username },
  });

  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);

  if (!ok) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET!, {
    expiresIn: "2h",
  });

  const response = NextResponse.json({ message: "Login successful" });

  response.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7200,
    path: '/',
  });

  return response;
}