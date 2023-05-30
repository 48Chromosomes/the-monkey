import { Client, Partials } from 'discord.js';

export const client = new Client({
	partials: [
		Partials.Message,
		Partials.Channel,
		Partials.Reaction,
		Partials.User,
	],
	intents: [
		'Guilds',
		'GuildMessages',
		'GuildMessageTyping',
		'GuildMembers',
		'GuildModeration',
		'GuildMessageReactions',
		'MessageContent',
	],
});
