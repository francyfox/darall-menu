"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.errorHandler = exports.notFound = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("./env.config");
function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}
exports.notFound = notFound;
function errorHandler(err, req, res, next) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: env_config_1.CONFIG.NODE_ENV === 'production' ? '🥞' : err.stack
    });
}
exports.errorHandler = errorHandler;
function isAuthenticated(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401);
        throw new Error('🚫 Un-Authorized 🚫');
    }
    try {
        const token = authorization.split(' ')[1];
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
//# sourceMappingURL=middleware.js.map