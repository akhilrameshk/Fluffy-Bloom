import { NextRequest, NextResponse } from 'next/server';
import { COOKIE, verify } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === '/admin/login') return NextResponse.next();
  if (await verify(req.cookies.get(COOKIE)?.value)) return NextResponse.next();
  return pathname.startsWith('/api')
    ? NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    : NextResponse.redirect(new URL('/admin/login', req.url));
}
export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] };
