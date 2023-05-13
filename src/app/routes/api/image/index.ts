import { Application, NextFunction, Request, Response } from 'express'
import { Resource } from 'express-automatic-routes'
// @ts-ignore
import sharp from "sharp"
import { CONFIG } from "../../../env.config"
// @ts-ignore
import multer from "multer"
import { imageUploadedLink } from "../../../module/image/image"

const storage = multer.memoryStorage()
export const uploader = multer({
  storage,
  limits: {
    fieldSize: 5 * 1024 * 1024 //  =< 5mb
  }
})
export default (express: Application) => <Resource> {
  middleware: uploader.single('file'),
  post: async (request: Request, response: Response, next: NextFunction) => {
    try {
      if (request.file) {
        const { image } = await imageUploadedLink(request.file)

        response.status(200).json({
          item: image
        })
      } else {
        response.status(400)
        throw new Error('Field file not found')
      }
    } catch (e) {
      next(e)
    }
  }
}