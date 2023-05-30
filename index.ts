import { Client, Message, MessageReaction, User } from 'discord.js';
import cron from 'node-cron';

import { handleMessageReaction } from './modules/roles';
import { selectUser } from './modules/movieClub';
import { respondToMessage } from './modules/chat';

import { client } from './modules/discord';

import './modules/express';

client.on('ready', (client: Client<true>) => {
	console.log(`Logged in as ${client?.user?.tag}!`);

	cron.schedule('0 21 * * SUN', async () => {
		selectUser(client);
	});
});

client.on('messageCreate', async (message: Message) =>
	respondToMessage(message),
);

client.on('messageReactionAdd', (reaction: MessageReaction, user: User) =>
	handleMessageReaction(reaction, user, true),
);

client.on('messageReactionRemove', (reaction: MessageReaction, user: User) =>
	handleMessageReaction(reaction, user, false),
);

client.login(process.env.DISCORD_TOKEN);
