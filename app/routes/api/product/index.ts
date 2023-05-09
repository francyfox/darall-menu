import { Application, NextFunction, Request, Response } from 'express'
import { Resource } from 'express-automatic-routes'
import { db } from "../../../const";
export default (express: Application) => <Resource> {
  get: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const filter: any = (request.query) ? request.query : null
      const collections = await db.product.findMany(filter)

      response.status(200).json({
        collections,
        count: collections.length
      })
    } catch (e) {
      next(e)
    }
  },

  post: async (request: Request, response: Response, next: NextFunction) => {
    const ProductRequired = ['name', 'price', 'category']

    try {
      const fields = request.body
      fields.price = Number(fields.price)

      for (const field of [...ProductRequired]) {
        if (!fields[field]) {
          response.status(400)
          throw new Error(`Field ${field} is empty`)
        }
      }

      const product = await db.product.create({
        data: fields
      })

      response.status(200).json({
        item: product
      })
    } catch (e) {
      next(e)
    }
  },
}