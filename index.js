const { Client, Collection } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const mongoose = require('mongoose');
const client = new Client({ intents: 3276799 });
const Logger = require('./utils/Logger');

client.commands = new Collection();

['CommandUtil', 'EventUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });

process.on('exit', code => { Logger.client(`Le processus s'est arrêté avec le code: ${code}!`) });

process.on('uncaughtException', (err, origin) => {
    Logger.error(`UNCAUGHT_EXCEPTION: ${err}!`);
    console.error(`Origine: ${origin}`)
});

process.on('unhandledRejection', (reason, promise) => {
    Logger.warn(`UNHANDLED_REJECTION: ${{reason}}`);
    console.log(promise);
});

process.on('warning', (...args) => Logger.warn(...args));


client.login(process.env.DISCORD_TOKEN);