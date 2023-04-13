"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openai = void 0;
var openai_1 = require("openai");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
exports.openai = new openai_1.OpenAIApi(configuration);
