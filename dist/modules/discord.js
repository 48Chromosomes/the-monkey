import { Client } from 'discord.js';
export const client = new Client({
    intents: ['Guilds', 'GuildMessages', 'GuildMessageTyping', 'GuildMembers', 'GuildModeration', 'MessageContent'],
});
client.on('ready', () => {
    console.log(`Logged in as ${client?.user?.tag}!`);
});
