import 'dotenv/config';
interface EnvConfig {
  readonly EXPRESS_PORT: number
  readonly NODE_ENV: string
  readonly JWT_ACCESS_SECRET: string
  readonly JWT_REFRESH_SECRET: string
}

export const CONFIG: EnvConfig = {
  EXPRESS_PORT: Number(process.env.EXPRESS_PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV ??= 'development',
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET ??= '',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ??= ''
}
