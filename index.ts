import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';

import { makeChain } from './modules/makechain';

import { client } from './modules/discord';
import { CHANNEL_ID } from './consts/consts';
import { processMessages } from './helpers';

import './modules/express';

client.on('messageCreate', async (message) => {
  const channel = client.channels.cache.get(CHANNEL_ID);

  // @ts-ignore
  const channelMessages = await channel?.messages.fetch({ limit: 20 });
  const processedMessages = processMessages({ channelMessages });

  if (message.channelId === CHANNEL_ID && !message.author.bot) {
    const vectorStore = await HNSWLib.load(`vectors/lotuseaters.bin`, new OpenAIEmbeddings());

    const chain = makeChain(vectorStore);

    const response = await chain.call({
      question: message.content,
      chat_history: processedMessages || [],
    });

    message.reply(response.text);
  }
});

client.login(process.env.DISCORD_TOKEN);
