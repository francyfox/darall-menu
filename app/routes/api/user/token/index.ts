import { Application, Request, Response } from 'express'
import { Resource } from 'express-automatic-routes'
export default (express: Application) => <Resource> {
  post: (request: Request, response: Response) => {
    response.status(200).send('need auth').end()
  }
}