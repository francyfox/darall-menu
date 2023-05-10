"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_automatic_routes_1 = __importDefault(require("express-automatic-routes"));
const env_config_1 = require("./app/env.config");
const logger_1 = require("./app/module/logger/logger");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const middleware_1 = require("./app/middleware");
const app = (0, express_1.default)();
const customHeaders = function (req, res, next) {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
};
const corsOpt = {
    origin: `http://localhost:${env_config_1.CONFIG.EXPRESS_PORT}`
};
app.use((0, cors_1.default)(corsOpt));
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(customHeaders);
app.use(logger_1.LoggerMiddleware);
// app.use(notFound)
app.use(middleware_1.errorHandler);
(0, express_automatic_routes_1.default)(app, {
    dir: './app/routes'
});
app.listen(env_config_1.CONFIG.EXPRESS_PORT, () => {
    logger_1.Logger.debug(`Server is up and running @
         http://localhost:${env_config_1.CONFIG.EXPRESS_PORT}/`);
});
