import { Application, NextFunction, Request, Response } from 'express'
import { Resource } from 'express-automatic-routes'
import { userTokenRefresh } from "../../../../module/module/user.token-refresh";
export default (express: Application) => <Resource> {
  post: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const {refreshToken: requestRefreshToken} = request.body as { refreshToken: string }

      const { accessToken, refreshToken} = await userTokenRefresh(response, requestRefreshToken)

      response.status(201).json({
        accessToken,
        refreshToken
      })
    } catch (e) {
      next(e)
    }
  }
}