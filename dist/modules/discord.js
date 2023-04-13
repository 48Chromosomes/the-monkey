"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var discord_js_1 = require("discord.js");
exports.client = new discord_js_1.Client({
    intents: ['Guilds', 'GuildMessages', 'GuildMessageTyping', 'GuildMembers', 'GuildModeration', 'MessageContent'],
});
exports.client.on('ready', function () {
    var _a;
    console.log("Logged in as ".concat((_a = exports.client === null || exports.client === void 0 ? void 0 : exports.client.user) === null || _a === void 0 ? void 0 : _a.tag, "!"));
});
