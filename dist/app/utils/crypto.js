"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashToken = void 0;
var crypto_1 = require("crypto");
function hashToken(token) {
    return (0, crypto_1.createHash)('sha512').update(token).digest('hex');
}
exports.hashToken = hashToken;
