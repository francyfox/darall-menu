// @ts-ignore
import multer from 'multer';
// @ts-ignore
import sharp from "sharp";
// @ts-ignore
import path from 'node:path';
import { mkdir, access } from 'node:fs/promises'
import s3 from "../../utils/s3";
import { CONFIG } from "../../env.config";


export async function s3Upload(file: Express.Multer.File) {
  const data = await s3.upload({
    Bucket: CONFIG.S3_BUCKET,
    Key: file.originalname,
    ContentType: path.extname(file.originalname),
    Body: file.buffer
  }).promise()

  return `https://${CONFIG.S3_BUCKET}.sirv.com/${file.originalname}`
}
export async function imageSharpFile(file: Express.Multer.File, filename: string) {
  const uploadDir = path.resolve(__dirname, '../../../../public/uploads')

  try {
    await access(uploadDir)
  } catch (e) {
    mkdir(uploadDir);
  }

  await sharp(file.buffer)
      .resize(800, 800, {
        fit: sharp.fit.cover,
        withoutEnlargement: true
      })
      .webp({ quality: 80 })
      .toFile(`${uploadDir}/${filename}`);

  return `/uploads/${filename}`
}