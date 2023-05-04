import { Application, Request, Response } from 'express'
import { Resource } from 'express-automatic-routes'
import { db } from "../../../../const";
export default (express: Application) => <Resource> {
  post: async (request: Request, response: Response) => {
    const {email, password} = request.body as { email: string, password: string }

    if (!email || !password) {
      response.status(400);
      throw new Error('You must provide an email and a password.');
    }

    const user = await db.user.findUnique({
      where: {
        // @ts-ignore
        email
      }
    })

    response.status(201).send(`its ok ${email}`)
  }
}