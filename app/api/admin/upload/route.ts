import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const file = (await req.formData()).get('file');
  if (!(file instanceof File) || !file.type.startsWith('image/'))
    return NextResponse.json({ error: 'Image file required' }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: 'Max 8 MB' }, { status: 400 });
  try {
    return NextResponse.json({ url: await uploadImage(Buffer.from(await file.arrayBuffer())) });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message || 'Upload failed' }, { status: 500 });
  }
}
