const Logger = require('../../utils/Logger');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        Logger.client('Je suis prêt!');

        const devGuild = await client.guilds.cache.get('1242059701324218419');
        devGuild.commands.set(client.commands.map(cmd => cmd));
    },
};