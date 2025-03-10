import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { clientId, token } from './config.json';

const commands = [
    new SlashCommandBuilder().setName('wakeup').setDescription('Wakes up the server'),
    new SlashCommandBuilder().setName('play').setDescription('Enqueues a song for playing')
        .addStringOption(option => option.setName("search_title").setDescription("Song to play").setRequired(true)),
    new SlashCommandBuilder().setName('sleep').setDescription('Leaves the voice channel'),
    new SlashCommandBuilder().setName('resume').setDescription('Resume the paused song'),
    new SlashCommandBuilder().setName('pause').setDescription('Pause the current song'),
    new SlashCommandBuilder().setName('next').setDescription('Go to the next song'),
    new SlashCommandBuilder().setName('prev').setDescription('Go to the previous song'),
    new SlashCommandBuilder().setName('queue').setDescription('Show the current playlist'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

export async function deployCommands(guildId) {
    try {
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully registered application commands.');
    } catch (error) {
        console.error(error);
    }
};