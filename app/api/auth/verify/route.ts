import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ message: 'OK' });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}