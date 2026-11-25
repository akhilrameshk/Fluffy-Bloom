import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { COOKIE, sign } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const ok =
    typeof email === 'string' && typeof password === 'string' &&
    email.toLowerCase() === (process.env.ADMIN_EMAIL || '').toLowerCase() &&
    (await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH || ''));
  if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, await sign(), {
    httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === 'production',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
