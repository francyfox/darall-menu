import { Application, NextFunction, Request, Response } from 'express'
import { Resource } from 'express-automatic-routes'
import { db } from "../../../../const";
import type { Product } from '@prisma/client'
export default (express: Application) => <Resource> {
  patch: async (request: Request, response: Response, next: NextFunction) => {
    const fields = request.body as Product

    if (!fields) {
      response.status(400)
      throw new Error('Missing fields')
    }

    const product = await db.product.update({
      where: {
        id: request.params.id
      },
      data: fields
    })

    response.status(200).json({
      item: product
    })
  }
}