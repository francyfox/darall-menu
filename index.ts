import express from 'express'
import { CONFIG } from "./app/env.config";

const app: express.Application = express()
const port: number = CONFIG.EXPRESS_PORT

app.get('/', (_req, _res) => {
  _res.send("TypeScript With Express");
})

app.post('/api/user/token', (_req, _res) => {
  const { username, password } = _req.body
})

app.get('/api/user/:id', (_req, _res) => {

})

app.listen(port, () => {
  console.log(`TypeScript with Express
         http://localhost:${port}/`);
})