import {
	EmbedBuilder,
	Client,
	TextChannel,
	MessageReaction,
	User,
} from 'discord.js';

import {
	ROLES_CHANNEL_ID,
	MOVIE_CLUB_MESSAGE_ID,
	MOVIE_CLUB_ROLE_ID,
	MOVIE_CLUB_REACTION_EMOJI,
} from '../consts/consts';

export const addRolesMessageToServer = async (client: Client<true>) => {
	const embed = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle('React with :clapper: to join Movie Club')
		.setDescription(
			'Reacting to this message will give you the Movie Club role!',
		);

	const channel = (await client.channels.fetch(
		ROLES_CHANNEL_ID,
	)) as TextChannel;

	channel.send({ embeds: [embed] });
};

export const handleMessageReaction = async (
	reaction: MessageReaction,
	user: User,
	added: boolean,
) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			return;
		}
	}

	if (user.bot) return;
	if (!reaction.message.guild) return;

	if (
		reaction.message.id === MOVIE_CLUB_MESSAGE_ID &&
		reaction.emoji.name === MOVIE_CLUB_REACTION_EMOJI
	) {
		let role = reaction.message.guild.roles.cache.get(MOVIE_CLUB_ROLE_ID);

		if (role) {
			let member = reaction.message.guild.members.cache.get(user.id);

			if (member) {
				try {
					if (added && !member.roles.cache.has(MOVIE_CLUB_ROLE_ID)) {
						await member.roles.add(role.id);
					} else if (!added && member.roles.cache.has(MOVIE_CLUB_ROLE_ID)) {
						await member.roles.remove(role.id);
					}
				} catch (err) {
					console.log(err);
				}
			}
		}
	}
};
