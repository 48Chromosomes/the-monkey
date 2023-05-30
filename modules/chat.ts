import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { Message } from 'discord.js';

import { makeChain } from './helpers';

import { client } from './discord';
import { THE_MONKEY_CHANNEL_ID } from '../consts/consts';
import { processMessages } from './helpers';

export const respondToMessage = async (message: Message) => {
	const channel = client.channels.cache.get(THE_MONKEY_CHANNEL_ID);

	// @ts-ignore
	const channelMessages = await channel?.messages.fetch({ limit: 20 });
	const processedMessages = processMessages({ channelMessages });

	if (message.channelId === THE_MONKEY_CHANNEL_ID && !message.author.bot) {
		const vectorStore = await HNSWLib.load(
			`vectors/gigamensch.bin`,
			new OpenAIEmbeddings(),
		);

		const chain = makeChain(vectorStore);

		const response = await chain.call({
			question: message.content,
			chat_history: processedMessages || [],
		});

		message.reply(response.text);
	}
};
