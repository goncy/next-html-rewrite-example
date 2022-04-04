import { NextRequest, NextResponse } from 'next/server';

const upstash = {
  get: async (domain: string) => {
    const map: Record<string, string> = {
      'http://localhost:3000': 'website1',
      'https://next-html-rewrite-example.vercel.app': 'website1',
    };

    return map[domain];
  },
};

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
