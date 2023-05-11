"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.errorHandler = exports.notFound = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var env_config_1 = require("./env.config");
function notFound(req, res, next) {
    res.status(404);
    var error = new Error("\uD83D\uDD0D - Not Found - ".concat(req.originalUrl));
    next(error);
}
exports.notFound = notFound;
function errorHandler(err, req, res, next) {
    var statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: env_config_1.CONFIG.NODE_ENV === 'production' ? '🥞' : err.stack
    });
}
exports.errorHandler = errorHandler;
function isAuthenticated(req, res, next) {
    var authorization = req.headers.authorization;
    if (!authorization) {
        res.status(401);
        throw new Error('🚫 Un-Authorized 🚫');
    }
    try {
        var token = authorization.split(' ')[1];
        req.payload = jsonwebtoken_1.default.verify(token, env_config_1.CONFIG.JWT_ACCESS_SECRET);
    }
    catch (err) {
        res.status(401);
        if (err.name === 'TokenExpiredError') {
            throw new Error(err.name);
        }
        throw new Error('🚫 Un-Authorized 🚫');
    }
    return next();
}
exports.isAuthenticated = isAuthenticated;
