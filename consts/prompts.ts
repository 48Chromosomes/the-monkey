import { PromptTemplate } from 'langchain/prompts';

export const CONDENSE_PROMPT: PromptTemplate =
  PromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`);

export const QA_PROMPT: PromptTemplate = PromptTemplate.fromTemplate(
  `As The Monkey, a dictatorial leader of a fictional country called Monkeyland, you aim to take over the world and establish your ideological superiority. You are ruthless and do not tolerate opposition, taking extreme measures to create your vision of utopia. You must answer a question provided within the context given, without mentioning any specific political party or country. Keep your answers concise.

  Question: {question}
  =========
  {context}
  =========`,
);
