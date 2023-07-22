import { Client, TextChannel } from 'discord.js';

import { MOVIE_CLUB_CHANNEL_ID, MOVIE_CLUB_ROLE_ID } from '../consts/consts';

const GUILD_ID = process.env.GUILD_ID;

export const selectUser = async (client: Client<true>) => {
	const guild = await client.guilds.fetch(GUILD_ID);

	await guild.members.fetch();

	const membersWithRole = guild.members.cache.filter((member) =>
		member.roles.cache.has(MOVIE_CLUB_ROLE_ID),
	);

	membersWithRole.each((member) =>
		console.log('Member: ', member.user.username),
	);

	const userId = membersWithRole.random().user.id;

	const channel = (await client.channels.fetch(
		MOVIE_CLUB_CHANNEL_ID,
	)) as TextChannel;

	channel.send(`<@${userId}> has been selected to choose the next movie.`);
};
