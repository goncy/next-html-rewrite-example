import { NextRequest, NextResponse } from 'next/server';
import { upstash } from '../lib/db';

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/;

function rewriteTo404(url: URL) {
  // Point to a 404 path to render the 404 page
  url.pathname = '/404/404';
  return NextResponse.rewrite(url);
}

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Skip public files
  if (PUBLIC_FILE.test(url.pathname)) return;

  // Allow the revalidation API to be used
  if (url.pathname === '/api/revalidate') return;

  // After callling /api/revalidate, it will make a call to /localhost?secret=...
  // and in that case we want to continue without rewriting
  if (url.searchParams.get('secret') === process.env.REVALIDATE_SECRET) {
    url.searchParams.delete('secret');
    return;
  }

  // For the example, only `/` allows content and any other path is a 404.
  // Removing this check allows other paths to go the same website
  if (url.pathname !== '/') return rewriteTo404(url);

  const website = await upstash.get(url.origin);

  // Similar check to the one in `pages/[website].tsx`, but running at the edge
  if (!website) return rewriteTo404(url);

  url.pathname = website ? `/${website}` : `/404`;

  return NextResponse.rewrite(url);
}
