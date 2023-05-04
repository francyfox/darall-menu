import { Logger } from "./logger";
import morgan from "morgan";
import { StreamOptions } from "morgan";
import { CONFIG } from "../../env.config";

const stream: StreamOptions = {
  write: (message) => Logger.http(message),
}

const skip = () => {
  return CONFIG.NODE_ENV !== "development";
}

export const LoggerMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
)