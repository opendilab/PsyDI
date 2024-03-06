import { NextRequest, NextResponse } from 'next/server'
import { NeteaseCloud } from '@/lib/neteasecloud'
import { getPsyDIAgent } from '@/app/psydi'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ""
  const agent = getPsyDIAgent()

  const searchResults = await agent.searchMusic(q)

  return NextResponse.json(searchResults);
}
