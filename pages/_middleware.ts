import { NextRequest, NextResponse } from 'next/server'

const upstash = {
  get: async (domain: string) => {
    const map: Record<string, string> = {
      'http://localhost:3000': 'bercel'
    }

    return map[domain]
  }
}

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname !== "/") return NextResponse.next()

  const bucket = await upstash.get(url.origin)

  url.pathname = bucket ? `/_bucket/${bucket}` : `/404`

  return NextResponse.rewrite(url);
}
