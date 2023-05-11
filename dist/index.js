"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_automatic_routes_1 = __importDefault(require("express-automatic-routes"));
var env_config_1 = require("./app/env.config");
var logger_1 = require("./app/module/logger/logger");
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var node_path_1 = __importDefault(require("node:path"));
var middleware_1 = require("./app/middleware");
var app = (0, express_1.default)();
var customHeaders = function (req, res, next) {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
};
// const corsOpt: CorsOptions = {
//   origin: [`http://localhost:${CONFIG.EXPRESS_PORT}`, 'http://localhost:5173/']
// }
console.log(__dirname + '/public');
app.use('/uploads', express_1.default.static(node_path_1.default.resolve(__dirname, '../public/uploads')));
app.use((0, cors_1.default)({ origin: '*' }));
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(customHeaders);
app.use(logger_1.LoggerMiddleware);
// app.use(notFound)
app.use(middleware_1.errorHandler);
(0, express_automatic_routes_1.default)(app, {
    dir: node_path_1.default.resolve(__dirname, './app/routes')
});
app.listen(env_config_1.CONFIG.EXPRESS_PORT, function () {
    logger_1.Logger.debug("Server is up and running @\n         http://localhost:".concat(env_config_1.CONFIG.EXPRESS_PORT, "/"));
});
