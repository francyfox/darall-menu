import { Application, NextFunction, Request, Response } from 'express'
import { Resource } from 'express-automatic-routes'
import { db } from "../../../const";
export default (express: Application) => <Resource> {
  get: async (request: Request, response: Response, next: NextFunction) => {
    try {
      let filter = (request.params.filter) ? JSON.parse(request.params.filter) : null
      const collections = await db.category.findMany(filter)

      response.status(200).json({
        collections,
        count: collections.length
      })
    } catch (e) {
      next(e)
    }
  },

  post: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const fields = request.body as { name: string }

      if (!fields.name) {
        response.status(400)
        throw new Error('Field name is empty')
      }

      const category = await db.category.create({
        data: fields
      })

      response.status(200).json({
        item: category
      })
    } catch (e) {
      next(e)
    }
  },

  delete: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { listId } = request.body as { listId: string[] }

      if (!listId) {
        response.status(400)
        throw new Error('Missing field listId')
      }

      const category = await db.category.deleteMany({
        where: {
          id: {
            in: listId
          }
        }
      })

      response.status(200).json({
        item: category
      })
    } catch (e) {
      next(e)
    }
  },
}