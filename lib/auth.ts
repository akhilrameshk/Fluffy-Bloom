import { SignJWT, jwtVerify } from 'jose';

export const COOKIE = 'fb_admin';
const key = () => new TextEncoder().encode(process.env.JWT_SECRET);

export const sign = () =>
  new SignJWT({ role: 'admin' }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('7d').sign(key());

export const verify = async (token?: string) => {
  if (!token) return false;
  try { await jwtVerify(token, key()); return true; } catch { return false; }
};
