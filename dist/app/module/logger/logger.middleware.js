"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
var logger_1 = require("./logger");
var morgan_1 = __importDefault(require("morgan"));
var env_config_1 = require("../../env.config");
var stream = {
    write: function (message) { return logger_1.Logger.http(message); },
};
var skip = function () {
    return env_config_1.CONFIG.NODE_ENV !== "development";
};
exports.LoggerMiddleware = (0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms", { stream: stream, skip: skip });
