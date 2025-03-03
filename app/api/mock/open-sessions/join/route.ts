import { NextResponse } from 'next/server';
import { joinOpenSession } from '@/lib/mock-data';

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }
    
    const result = joinOpenSession(sessionId);
    return NextResponse.json({ participantId: result.participantId }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
} 