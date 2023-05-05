import { Application, NextFunction, Request, Response } from 'express'
import { Resource } from 'express-automatic-routes'
import { userAuth } from "../../../../module/module/user.auth";
export default (express: Application) => <Resource> {
  post: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const {email, password} = request.body as { email: string, password: string }
      const { accessToken, refreshToken} = await userAuth(response, email, password)
      response.status(201).json({
        accessToken,
        refreshToken
      });
    } catch (e) {
      next(e)
    }
  }
}