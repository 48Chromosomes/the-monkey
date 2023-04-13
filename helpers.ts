import { ChatCompletionRequestMessage } from 'openai';
import { Message } from 'discord.js';
import { SYSTEM_MESSAGE } from './consts';

export const processMessages = ({ channelMessages }: { channelMessages: Message[] }) => {
  const messageList: ChatCompletionRequestMessage[] = [{ role: 'system', content: SYSTEM_MESSAGE }];

  channelMessages.reverse().forEach((message: any) => {
    const role = message.author.username === 'The Monkey' ? 'assistant' : 'user';
    messageList.push({ role, content: message.content });
  });

  return messageList;
};
