"use strict";
var _a, _b, _c;
var _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
require("dotenv/config");
exports.CONFIG = {
    EXPRESS_PORT: Number(process.env.EXPRESS_PORT) || 3000,
    NODE_ENV: (_a = (_d = process.env).NODE_ENV) !== null && _a !== void 0 ? _a : (_d.NODE_ENV = 'development'),
    JWT_ACCESS_SECRET: (_b = (_e = process.env).JWT_ACCESS_SECRET) !== null && _b !== void 0 ? _b : (_e.JWT_ACCESS_SECRET = ''),
    JWT_REFRESH_SECRET: (_c = (_f = process.env).JWT_REFRESH_SECRET) !== null && _c !== void 0 ? _c : (_f.JWT_REFRESH_SECRET = '')
};
//# sourceMappingURL=env.config.js.map