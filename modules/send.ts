import { TextChannel } from 'discord.js';
import prompts from 'prompts';

import { client } from './discord';

import {
	MOVIE_CLUB_CHANNEL_ID,
	THE_MONKEY_CHANNEL_ID,
	ME_CHANNEL_ID,
} from '../consts/consts';

client.login(process.env.DISCORD_TOKEN);

(async () => {
	const response = await prompts([
		{
			type: 'select',
			name: 'channelId',
			message: 'Channel: ',
			choices: [
				{
					title: 'the-monkey',
					value: THE_MONKEY_CHANNEL_ID,
				},
				{ title: 'movies', value: MOVIE_CLUB_CHANNEL_ID },
				{ title: 'me', value: ME_CHANNEL_ID },
			],
		},
		{
			type: 'text',
			name: 'message',
			message: 'Message: ',
		},
	]);

	const { channelId, message } = response;

	const channel = (await client.channels.fetch(channelId)) as TextChannel;

	await channel.send(message);

	process.exit(0);
})();
