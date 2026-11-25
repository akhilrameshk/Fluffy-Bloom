import { NextRequest, NextResponse } from 'next/server';
import type { Model } from 'mongoose';
import { connect } from './db';

type Ctx = { params: { id: string } };

export const collection = (M: Model<any>, populate?: string) => ({
  GET: async () => {
    await connect();
    let q = M.find().sort({ createdAt: -1 });
    if (populate) q = q.populate(populate);
    return NextResponse.json(await q.lean());
  },
  POST: async (req: NextRequest) => {
    await connect();
    return NextResponse.json(await M.create(await req.json()));
  },
});

export const item = (M: Model<any>, onDelete?: (doc: any) => Promise<void>) => ({
  PUT: async (req: NextRequest, { params }: Ctx) => {
    await connect();
    return NextResponse.json(await M.findByIdAndUpdate(params.id, await req.json(), { new: true }));
  },
  DELETE: async (_req: NextRequest, { params }: Ctx) => {
    await connect();
    const doc = await M.findByIdAndDelete(params.id);
    if (doc && onDelete) await onDelete(doc);
    return NextResponse.json({ ok: true });
  },
});
