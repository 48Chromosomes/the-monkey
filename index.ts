import {
	Client,
	Message,
	MessageReaction,
	User,
	ChatInputCommandInteraction,
} from 'discord.js';
import cron from 'node-cron';

import { handleMessageReaction } from './modules/roles';
import { selectUser } from './modules/movieClub';
import { respondToCommand, respondToMessageWithChain } from './modules/chat';
import { addMonkeyCommands } from './modules/commands';

import { client } from './modules/discord';

import './modules/express';

client.on('ready', (client: Client<true>) => {
	console.log(`Logged in as ${client?.user?.tag}!`);

	addMonkeyCommands(client);
	selectUser(client);

	cron.schedule('0 20 * * SUN', async () => {
		selectUser(client);
	});
});

client.on('messageCreate', async (message: Message) =>
	respondToMessageWithChain(message),
);

client.on('messageReactionAdd', (reaction: MessageReaction, user: User) =>
	handleMessageReaction(reaction, user, true),
);

client.on('messageReactionRemove', (reaction: MessageReaction, user: User) =>
	handleMessageReaction(reaction, user, false),
);

client.on(
	'interactionCreate',
	async (interaction: ChatInputCommandInteraction) => {
		if (!interaction.isCommand()) return;

		const { commandName } = interaction;

		if (commandName === 'monkey') await respondToCommand(interaction);
	},
);

client.login(process.env.DISCORD_TOKEN);
