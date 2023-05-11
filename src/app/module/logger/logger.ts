import path from 'node:path';
import { format, transports, addColors, createLogger } from 'winston'
import { CONFIG } from "../../env.config";
import { LoggerMiddleware } from "./logger.middleware";
export const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

export const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

addColors(colors)

const winstonFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.colorize({ all: true }),
    format.printf(
        (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
    ),
)

const winstonTransports = [
  new transports.Console(),
  new transports.File({
    filename: path.resolve(__dirname, '../../logs/error.log'),
    level: 'error',
  }),
  new transports.File({ filename: path.resolve(__dirname, '../../logs/all.log') }),
]

export const Logger = createLogger({
  level: CONFIG.NODE_ENV === 'development' ? 'debug' : 'warn',
  levels,
  format: winstonFormat,
  transports: winstonTransports
})

export { LoggerMiddleware }



