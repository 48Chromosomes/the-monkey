import { SYSTEM_MESSAGE } from './consts';
export const processMessages = ({ channelMessages }) => {
    const messageList = [{ role: 'system', content: SYSTEM_MESSAGE }];
    channelMessages.reverse().forEach((message) => {
        const role = message.author.username === 'The Monkey' ? 'assistant' : 'user';
        messageList.push({ role, content: message.content });
    });
    return messageList;
};
