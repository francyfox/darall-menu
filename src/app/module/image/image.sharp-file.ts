// @ts-ignore
import multer from 'multer';
// @ts-ignore
import sharp from "sharp";
// @ts-ignore
import path from 'node:path';
import { mkdir, access } from 'node:fs/promises'
import { CONFIG } from "../../env.config";
import { db } from "../../const";

export async function imageSharpFile(file: Express.Multer.File) {
  const uploadDir = path.resolve(__dirname, '../../../../public/uploads')
  const filename = `${Date.now()}.webp`

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

  const link = `/uploads/${filename}`

  const image = await db.image.create({
    data: {
      name: filename,
      link
    }
  })

  return { image }
}