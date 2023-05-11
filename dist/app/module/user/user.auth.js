"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = void 0;
var const_1 = require("../../const");
var bcrypt_1 = require("bcrypt");
var uuid_1 = require("uuid");
var jwt_1 = require("../../utils/jwt");
var crypto_1 = require("../../utils/crypto");
function userAuth(response, email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, isPassValid, uuid, _a, accessToken, refreshToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!email || !password) {
                        response.status(400);
                        throw new Error('You must provide an email and a password.');
                    }
                    return [4 /*yield*/, const_1.db.user.findUnique({
                            where: {
                                // @ts-ignore
                                email: email
                            }
                        })];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        response.status(403);
                        throw new Error('User with this email not found');
                    }
                    return [4 /*yield*/, (0, bcrypt_1.compare)(password, user.password)];
                case 2:
                    isPassValid = _b.sent();
                    if (!isPassValid) {
                        response.status(403);
                        throw new Error('Password is not valid, try again :)');
                    }
                    uuid = (0, uuid_1.v4)();
                    _a = (0, jwt_1.generateTokens)(user, uuid), accessToken = _a.accessToken, refreshToken = _a.refreshToken;
                    return [4 /*yield*/, const_1.db.refreshToken.create({
                            data: {
                                id: uuid,
                                hashedToken: (0, crypto_1.hashToken)(refreshToken),
                                userId: user.id
                            },
                        })];
                case 3:
                    _b.sent();
                    return [2 /*return*/, {
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        }];
            }
        });
    });
}
exports.userAuth = userAuth;
