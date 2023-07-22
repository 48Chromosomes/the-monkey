import { Client } from 'discord.js';

import { GUILD_ID } from '../consts/consts';

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
