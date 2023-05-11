import express from 'express'
import autoroutes from 'express-automatic-routes'
import { CONFIG } from "./app/env.config";
import { Logger, LoggerMiddleware } from "./app/module/logger/logger";
import { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cors, { CorsOptions } from 'cors'
import helmet from "helmet";
import path from 'node:path';
import { errorHandler } from "./app/middleware";

const app: express.Application = express()
const customHeaders = function (req: Request, res: Response, next: NextFunction) {
  res.setHeader('Last-Modified', (new Date()).toUTCString())
  next()
}

// const corsOpt: CorsOptions = {
//   origin: [`http://localhost:${CONFIG.EXPRESS_PORT}`, 'http://localhost:5173/']
// }

app.use(express.static(__dirname + '/public'))
app.use(cors({origin: '*'}))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(customHeaders)

app.use(LoggerMiddleware)
// app.use(notFound)
app.use(errorHandler)

autoroutes(app, {

  dir: path.resolve(__dirname,'./app/routes')
})

app.listen(CONFIG.EXPRESS_PORT, () => {
  Logger.debug(`Server is up and running @
         http://localhost:${CONFIG.EXPRESS_PORT}/`)
})