import { Client } from 'discord.js';

const GUILD_ID = process.env.GUILD_ID;

export const addMonkeyCommands = async (client: Client<true>) => {
	const commandData = {
		name: 'monkey',
		description: 'Speak to The Monkey!',
		options: [
			{
				name: 'message',
				type: 3,
				description: 'The message to send',
				required: true,
			},
		],
	};

	const guild = await client.guilds.fetch(GUILD_ID);
	await guild.commands.create(commandData);
};
