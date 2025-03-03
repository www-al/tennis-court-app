import { NextResponse } from 'next/server';
import { courts } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(courts);
} 