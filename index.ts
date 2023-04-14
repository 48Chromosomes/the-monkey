import { ChatCompletionResponseMessage } from 'openai';

import { client } from './modules/discord';
import { openai } from './modules/openai';
import { CHANNEL_ID } from './consts';
import { processMessages } from './helpers';

import './modules/express';

client.on('messageCreate', async (message) => {
  const channel = client.channels.cache.get(CHANNEL_ID);

  // @ts-ignore
  const channelMessages = await channel?.messages.fetch({ limit: 2 });
  const processedMessages = processMessages({ channelMessages });

  if (message.channelId === CHANNEL_ID && !message.author.bot) {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: processedMessages,
      max_tokens: 1000,
      temperature: 0.5,
    });

    const reply: ChatCompletionResponseMessage | '' = completion.data.choices[0].message || '';

    message.reply(reply);
  }
});

client.login(process.env.DISCORD_TOKEN);
