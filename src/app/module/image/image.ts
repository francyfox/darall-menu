import { db } from "../../const";
import { s3Upload } from "./image.upload-file"
import path from 'node:path'
export async function imageUploadedLink(file: Express.Multer.File) {
  const filename = file.originalname.replace(path.extname(file.originalname), '')
  // const link = (CONFIG.NODE_ENV === 'development')
  //     ? await imageUploadFile(file, filename)
  //     : await cloudlinkUpload(file, filename)

  const link = await s3Upload(file)

  if (link === null) {
    throw new Error('Error on file upload')
  }

  const image = await db.image.create({
    data: {
      name: filename,
      link
    }
  })

  return { image }
}