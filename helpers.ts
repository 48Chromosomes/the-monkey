import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai';
import { Message } from 'discord.js';
import { SYSTEM_MESSAGE } from './consts';

export const processMessages = ({ channelMessages }: { channelMessages: Message[] }) => {
  const messageList: ChatCompletionRequestMessage[] = [{ role: 'system', content: SYSTEM_MESSAGE }];

  channelMessages.reverse().forEach((message: Message) => {
    const role: ChatCompletionRequestMessageRoleEnum = message.author.username === 'The Monkey' ? 'assistant' : 'user';
    const messageWithContext: string = `[${message.author.username}] ${message.content}`;
    messageList.push({ role, content: messageWithContext });
  });

  return messageList;
};
