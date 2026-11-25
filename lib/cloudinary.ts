import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadImage = (buf: Buffer) =>
  new Promise<string>((resolve, reject) =>
    cloudinary.uploader
      .upload_stream({ folder: 'fluffy-bloom', resource_type: 'image' }, (err, res) =>
        err || !res ? reject(err ?? new Error('Upload failed')) : resolve(res.secure_url))
      .end(buf));

export const destroyImage = async (url?: string) => {
  const id = url?.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z0-9]+$/i)?.[1];
  if (id) await cloudinary.uploader.destroy(id).catch(() => {});
};
