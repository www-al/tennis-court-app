import { NextResponse } from 'next/server';
import { completePayment } from '@/lib/mock-data';

// Simulate processing a payment and updating the participant's payment status
export async function POST(req: Request) {
  try {
    const { participantId } = await req.json();
    
    if (!participantId) {
      return NextResponse.json({ error: 'Participant ID is required' }, { status: 400 });
    }
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful payment processing
    return NextResponse.json(
      { 
        success: true, 
        message: 'Payment intent created', 
        clientSecret: 'mock_client_secret_' + Date.now()
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Simulate confirming a payment and updating the participant's payment status
export async function PUT(req: Request) {
  try {
    const { participantId } = await req.json();
    
    if (!participantId) {
      return NextResponse.json({ error: 'Participant ID is required' }, { status: 400 });
    }
    
    // Complete payment in our mock data
    const result = completePayment(participantId);
    
    return NextResponse.json({ 
      success: true, 
      participant: result.participant,
      session: result.session
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
} 