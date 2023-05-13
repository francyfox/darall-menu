"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var env_config_1 = require("../env.config");
aws_sdk_1.default.config.update({
    accessKeyId: env_config_1.CONFIG.S3_ACCESS_KEY,
    secretAccessKey: env_config_1.CONFIG.S3_SECRET_KEY,
    s3ForcePathStyle: true
});
var s3 = new aws_sdk_1.default.S3({
    endpoint: new aws_sdk_1.default.Endpoint(env_config_1.CONFIG.S3_ENDPOINT),
    params: {
        Bucket: env_config_1.CONFIG.S3_BUCKET
    }
});
exports.default = s3;
