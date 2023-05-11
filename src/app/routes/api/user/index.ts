import { Application, NextFunction, Request, Response } from 'express'
import { Resource } from 'express-automatic-routes'
import createUser from "../../../module/user/user.create-user";

export default (express: Application) => <Resource> {
  post: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userForm = request.body;
      const { accessToken, refreshToken } = await createUser(userForm)

      response.status(201).json({
        accessToken,
        refreshToken
      })
    } catch (e) {
      next(e)
    }
  }
}