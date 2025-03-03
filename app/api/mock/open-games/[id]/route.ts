import { NextResponse } from 'next/server';
import { getOpenSessionById } from '@/lib/mock-data';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const session = getOpenSessionById(params.id);
  
  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }
  
  return NextResponse.json(session);
} 