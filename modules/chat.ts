import { Message, ChatInputCommandInteraction, TextChannel } from 'discord.js';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { CallbackManager } from 'langchain/callbacks';
import { PromptTemplate } from 'langchain/prompts';
import { OpenAIChat } from 'langchain/llms/openai';
import { LLMChain } from 'langchain/chains';

import { makeChain } from './helpers';

import { client } from './discord';
import { processMessages } from './helpers';

import { THE_MONKEY_CHANNEL_ID } from '../consts/consts';

export const respondToMessageWithChain = async (message: Message) => {
	const channel = client.channels.cache.get(
		THE_MONKEY_CHANNEL_ID,
	) as TextChannel;

	const channelMessages = await channel.messages.fetch({ limit: 20 });
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

export const respondToCommand = async (
	interaction: ChatInputCommandInteraction,
) => {
	await interaction.deferReply();

	const { options, channelId, user } = interaction;
	const message = options.getString('message');
	let stream = '';

	const channel = client.channels.cache.get(channelId) as TextChannel;

	const channelMessages = await channel.messages.fetch({ limit: 20 });
	const processedMessages = processMessages({ channelMessages });

	const chain = new LLMChain({
		llm: new OpenAIChat({
			modelName: 'gpt-4',
			prefixMessages: processedMessages,
			streaming: true,
			callbackManager: CallbackManager.fromHandlers({
				async handleLLMNewToken(token) {
					stream = `${stream}${token}`;
					await interaction.editReply(
						`**${message}** - <@${user.id}> \n \n ${stream}`,
					);
				},
			}),
		}),
		prompt: PromptTemplate.fromTemplate(message),
	});

	chain.call({});
};
