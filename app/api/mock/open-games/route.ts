import { NextResponse } from 'next/server';
import { getOpenSessions, createOpenSession } from '@/lib/mock-data';

export async function GET() {
  const sessions = getOpenSessions();
  return NextResponse.json(sessions);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newSession = createOpenSession(data);
    return NextResponse.json(newSession, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
} 