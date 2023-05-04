import 'dotenv/config';
interface EnvConfig {
  readonly EXPRESS_PORT: number
  readonly NODE_ENV: string
}

export const CONFIG: EnvConfig = {
  EXPRESS_PORT: Number(process.env.EXPRESS_PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV ??= 'development'
}
