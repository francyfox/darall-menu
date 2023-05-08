import { Application, NextFunction, Request, Response } from 'express'
import { Resource } from 'express-automatic-routes'
import { db } from "../../../const";
import type { Product } from '@prisma/client'
export default (express: Application) => <Resource> {
  get: async (request: Request, response: Response, next: NextFunction) => {
    try {
      let filter = (request.params.filter) ? JSON.parse(request.params.filter) : null
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
    const ProductRequired: string[] = ['name', 'price', 'categoryId']

    try {
      const fields = request.body as Product

      for (const field of [...ProductRequired]) {
        if (field) {
          console.log(field)
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