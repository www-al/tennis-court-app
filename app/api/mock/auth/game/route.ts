import { NextResponse } from 'next/server';
import { getMockSession } from '@/lib/mock-data';

export async function GET() {
  // Return a mock session for demo purposes
  const mockSessionData = getMockSession();
  
  return NextResponse.json(mockSessionData);
} 