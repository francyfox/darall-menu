import { Application, NextFunction, Request, Response } from "express";
import { Resource } from "express-automatic-routes";
import { db } from "../../../../../const";

export default (express: Application) => <Resource> {
  post: async (request: Request, response: Response, next: NextFunction) => {
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
  }
}