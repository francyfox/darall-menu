"use strict";
var _a, _b, _c, _d, _e, _f, _g;
var _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
require("dotenv/config");
exports.CONFIG = {
    EXPRESS_PORT: Number(process.env.EXPRESS_PORT) || 3000,
    NODE_ENV: (_a = (_h = process.env).NODE_ENV) !== null && _a !== void 0 ? _a : (_h.NODE_ENV = 'development'),
    JWT_ACCESS_SECRET: (_b = (_j = process.env).JWT_ACCESS_SECRET) !== null && _b !== void 0 ? _b : (_j.JWT_ACCESS_SECRET = ''),
    JWT_REFRESH_SECRET: (_c = (_k = process.env).JWT_REFRESH_SECRET) !== null && _c !== void 0 ? _c : (_k.JWT_REFRESH_SECRET = ''),
    S3_BUCKET: (_d = (_l = process.env).S3_BUCKET) !== null && _d !== void 0 ? _d : (_l.S3_BUCKET = ''),
    S3_ENDPOINT: (_e = (_m = process.env).S3_ENDPOINT) !== null && _e !== void 0 ? _e : (_m.S3_ENDPOINT = ''),
    S3_ACCESS_KEY: (_f = (_o = process.env).S3_ACCESS_KEY) !== null && _f !== void 0 ? _f : (_o.S3_ACCESS_KEY = ''),
    S3_SECRET_KEY: (_g = (_p = process.env).S3_SECRET_KEY) !== null && _g !== void 0 ? _g : (_p.S3_SECRET_KEY = ''),
};
