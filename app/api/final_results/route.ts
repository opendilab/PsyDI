import { NextRequest, NextResponse } from 'next/server'
import { getPsyDIAgent } from '@/app/psydi'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ""
  const task = 'analysis'  // figure
  const agent = getPsyDIAgent()
  const [userId, _] = await agent.registerUser(false)

  const apiUrl = process.env.PSYDI_API_URL || 'placeholder'
  const url = `${apiUrl}/get_result`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.PSYDI_API_KEY || ''}`,
    },
    body: JSON.stringify({'uid': userId, 'task': task}),
  });
  const data = await response.json();
  console.log('fetched', data, q)

  return NextResponse.json(data);
}
