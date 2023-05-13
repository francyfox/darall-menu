import 'dotenv/config';
interface EnvConfig {
  readonly EXPRESS_PORT: number
  readonly NODE_ENV: string
  readonly JWT_ACCESS_SECRET: string
  readonly JWT_REFRESH_SECRET: string
  readonly S3_BUCKET: string
  readonly S3_ENDPOINT: string
  readonly S3_ACCESS_KEY: string
  readonly S3_SECRET_KEY: string
}

export const CONFIG: EnvConfig = {
  EXPRESS_PORT: Number(process.env.EXPRESS_PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV ??= 'development',
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET ??= '',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ??= '',
  S3_BUCKET: process.env.S3_BUCKET ??= '',
  S3_ENDPOINT: process.env.S3_ENDPOINT ??= '',
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY ??= '',
  S3_SECRET_KEY: process.env.S3_SECRET_KEY ??= '',
}
