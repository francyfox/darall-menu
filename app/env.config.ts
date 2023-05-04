import 'dotenv/config';
interface EnvConfig {
  readonly EXPRESS_PORT: number
}

export const CONFIG: EnvConfig = {
  EXPRESS_PORT: Number(process.env.EXPRESS_PORT) || 3000
}
