// src/app/api/parse-resume/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No resume file provided' },
        { status: 400 }
      );
    }

    // Log file details
    console.log('File received in API:', file.name, file.type, file.size);
    
    // Return success message - we're not actually parsing here anymore
    // since parsing happens client-side
    return NextResponse.json({ 
      success: true, 
      message: 'File received successfully'
    });
  } catch (error) {
    console.error('Resume API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}