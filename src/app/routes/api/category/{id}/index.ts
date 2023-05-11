import { Application, NextFunction, Request, Response } from 'express'
import { Resource } from 'express-automatic-routes'
import { db } from "../../../../const";
export default (express: Application) => <Resource> {
  patch: async (request: Request, response: Response, next: NextFunction) => {
    const { name } = request.body as { name: string }

    if (!name) {
      response.status(400)
      throw new Error('Missing field name')
    }

    const category = await db.category.update({
      where: {
        id: request.params.id
      },
      data: {
        name
      }
    })

    response.status(200).json({
      item: category
    })
  }
}