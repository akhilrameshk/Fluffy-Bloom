import mongoose from 'mongoose';

type Cache = { conn: typeof mongoose | null; p: Promise<typeof mongoose> | null };
const g = global as typeof globalThis & { _mongo?: Cache };
const cache: Cache = g._mongo || (g._mongo = { conn: null, p: null });

export async function connect() {
  if (cache.conn) return cache.conn;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');
  cache.p ||= mongoose.connect(uri);
  return (cache.conn = await cache.p);
}
