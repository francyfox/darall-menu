"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = exports.Logger = exports.colors = exports.levels = void 0;
var node_path_1 = __importDefault(require("node:path"));
var winston_1 = require("winston");
var env_config_1 = require("../../env.config");
var logger_middleware_1 = require("./logger.middleware");
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
var winstonFormat = winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.colorize({ all: true }), winston_1.format.printf(function (info) { return "[".concat(info.timestamp, "] ").concat(info.level, ": ").concat(info.message); }));
var winstonTransports = [
    new winston_1.transports.Console(),
    new winston_1.transports.File({
        filename: node_path_1.default.resolve(__dirname, '../../logs/error.log'),
        level: 'error',
    }),
    new winston_1.transports.File({ filename: node_path_1.default.resolve(__dirname, '../../logs/all.log') }),
];
exports.Logger = (0, winston_1.createLogger)({
    level: env_config_1.CONFIG.NODE_ENV === 'development' ? 'debug' : 'warn',
    levels: exports.levels,
    format: winstonFormat,
    transports: winstonTransports
});
