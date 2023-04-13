"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processMessages = void 0;
var consts_1 = require("./consts");
var processMessages = function (_a) {
    var channelMessages = _a.channelMessages;
    var messageList = [{ role: 'system', content: consts_1.SYSTEM_MESSAGE }];
    channelMessages.reverse().forEach(function (message) {
        var role = message.author.username === 'The Monkey' ? 'assistant' : 'user';
        messageList.push({ role: role, content: message.content });
    });
    return messageList;
};
exports.processMessages = processMessages;
