import { NextRequest, NextResponse } from 'next/server';
import { upstash } from '../lib/db';

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname !== '/') {
    // Point to a 404 path to render the 404 page
    url.pathname = '/404/404';
    return NextResponse.rewrite(url);
  }

  const bucket = await upstash.get(url.origin);

  url.pathname = bucket ? `/${bucket}` : `/404`;

  console.log('PATHNNAME', url.pathname);

  return NextResponse.rewrite(url);
}
