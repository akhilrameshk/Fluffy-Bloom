import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/db';
import { Setting } from '@/lib/models';
import { getSettings } from '@/lib/data';

export async function GET() {
  return NextResponse.json(await getSettings());
}

export async function PUT(req: NextRequest) {
  await connect();
  const { _id, createdAt, updatedAt, __v, ...body } = await req.json();
  return NextResponse.json(await Setting.findOneAndUpdate({}, body, { upsert: true, new: true, setDefaultsOnInsert: true }));
}
