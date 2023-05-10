"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = exports.Logger = exports.colors = exports.levels = void 0;
const winston_1 = require("winston");
const env_config_1 = require("../../env.config");
const logger_middleware_1 = require("./logger.middleware");
Object.defineProperty(exports, "LoggerMiddleware", { enumerable: true, get: function () { return logger_middleware_1.LoggerMiddleware; } });
exports.levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
exports.colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};
(0, winston_1.addColors)(exports.colors);
const winstonFormat = winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.colorize({ all: true }), winston_1.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`));
const winstonTransports = [
    new winston_1.transports.Console(),
    new winston_1.transports.File({
        filename: 'logs/error.log',
        level: 'error',
    }),
    new winston_1.transports.File({ filename: 'logs/all.log' }),
];
exports.Logger = (0, winston_1.createLogger)({
    level: env_config_1.CONFIG.NODE_ENV === 'development' ? 'debug' : 'warn',
    levels: exports.levels,
    format: winstonFormat,
    transports: winstonTransports
});
//# sourceMappingURL=logger.js.map