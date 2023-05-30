import {
	ChatCompletionRequestMessage,
	ChatCompletionRequestMessageRoleEnum,
} from 'openai';
import { Message, Collection } from 'discord.js';
import { OpenAIChat } from 'langchain/llms/openai';
import { LLMChain, ChatVectorDBQAChain, loadQAChain } from 'langchain/chains';
import { VectorStore } from 'langchain/vectorstores';

import { CONDENSE_PROMPT, QA_PROMPT } from '../consts/prompts';
import { SYSTEM_MESSAGE } from '../consts/consts';

type ProcessedMessagesProps = {
	channelMessages: Collection<string, Message<true>>;
};

export const processMessages = ({
	channelMessages,
}: ProcessedMessagesProps) => {
	const messageList: ChatCompletionRequestMessage[] = [
		{ role: 'system', content: SYSTEM_MESSAGE },
	];

	channelMessages.reverse().forEach((message: Message) => {
		const role: ChatCompletionRequestMessageRoleEnum =
			message.author.username === 'The Monkey' ? 'assistant' : 'user';

		messageList.push({ role, content: message.content });
	});

	return messageList;
};

export const makeChain = (vectorstore: VectorStore) => {
	const questionGenerator = new LLMChain({
		llm: new OpenAIChat({ temperature: 0, modelName: 'gpt-4' }),
		prompt: CONDENSE_PROMPT,
	});

	const docChain = loadQAChain(
		new OpenAIChat({
			temperature: 0,
			modelName: 'gpt-4',
		}),
		{ prompt: QA_PROMPT },
	);

	return new ChatVectorDBQAChain({
		vectorstore,
		combineDocumentsChain: docChain,
		questionGeneratorChain: questionGenerator,
		returnSourceDocuments: true,
		k: 4,
	});
};
