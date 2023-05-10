"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const logger_1 = require("./logger");
const morgan_1 = __importDefault(require("morgan"));
const env_config_1 = require("../../env.config");
const stream = {
    write: (message) => logger_1.Logger.http(message),
};
const skip = () => {
    return env_config_1.CONFIG.NODE_ENV !== "development";
};
exports.LoggerMiddleware = (0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms", { stream, skip });
//# sourceMappingURL=logger.middleware.js.map