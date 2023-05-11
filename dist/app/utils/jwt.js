"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = exports.generateRefreshToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var env_config_1 = require("../env.config");
function generateAccessToken(user) {
    return (0, jsonwebtoken_1.sign)({ userId: user.id }, env_config_1.CONFIG.JWT_ACCESS_SECRET, {
        expiresIn: '20m',
    });
}
function generateRefreshToken(user, tokenId) {
    var payload = {
        userId: user.id,
        tokenId: tokenId
    };
    return (0, jsonwebtoken_1.sign)(payload, env_config_1.CONFIG.JWT_REFRESH_SECRET, {
        expiresIn: '12h',
    });
}
exports.generateRefreshToken = generateRefreshToken;
function generateTokens(user, jti) {
    var accessToken = generateAccessToken(user);
    var refreshToken = generateRefreshToken(user, jti);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
}
exports.generateTokens = generateTokens;
