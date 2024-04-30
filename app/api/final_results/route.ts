import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { getPsyDIAgent } from '@/app/psydi'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ""
  let task = ''
  if (q == 'analysis') {
    task = 'analysis'
  } else if (q == 'figure') {
    task = 'figure'
  } else {
    return NextResponse.json({error: 'invalid query'})
  }
  const agent = getPsyDIAgent()
  const [userId, _] = await agent.registerUser(false)
  const headUrl = await kv.hget(`ucount:${userId}mbti`, 'headUrl');
  const vizResult = await kv.hget(`ucount:${userId}mbti`, 'vizResult');

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
  let data = await response.json();
  data['ret']['qrcode_image_url'] = process.env.QRCODE_IMAGE_URL
  data['ret']['head_url'] = headUrl
  data['ret']['viz_result'] = vizResult

  return NextResponse.json(data);
}
