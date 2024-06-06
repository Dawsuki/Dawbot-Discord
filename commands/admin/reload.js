module.exports = {
    name: 'reload',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'reload',
    examples: ['reload'],
    description: 'Redémarre le bot',
    async run (client, message, args) {
        //const devGuild = await client.guilds.cache.get('1242059701324218419');
        //devGuild.commands.set([]);
        await interaction.reply('Bot relancé 🔄');
        return process.exit();
    },
    async runInteraction (client, interaction) {
        //const devGuild = await client.guilds.cache.get('1242059701324218419');
        //devGuild.commands.set([]);
        await interaction.reply('Bot relancé 🔄');
        return process.exit();
    }
};
