import { Application, NextFunction, Request, Response } from 'express'
import { Resource } from 'express-automatic-routes'
export default (express: Application) => <Resource> {
  get: (request: Request, response: Response, next: NextFunction) => {
    response.status(200).send('Hello, Route!').end()
  }
}