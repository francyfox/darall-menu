"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (express) { return ({
    get: function (request, response, next) {
        response.status(200).send('hello').end();
    }
}); });
