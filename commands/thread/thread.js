module.exports = {
    name: 'thread',
    category: 'thread',
    permissions: ['MANAGE_THREADS'],
    ownerOnly: false,
    usage: 'thread [join|leave|archive|unarchive|delete]',
    examples: ['thread join', 'thread leave'],
    description: 'Commande concernat les threads',
    async run (client, message, args) {
        let thread = message.channel;
        if (!thread.isThread()) return message.reply('Impossible de taper cette commande car vous n\'etes pas dans un thread!');

        if (!args[0] || !args[0].match(/^(join|leave|archive|unarchive|delete)$/)) return message.reply('Merci d\'entrer une sous-commande valide (\`join\`/\`leave\`/\`archive\`/\`unarchive\`/\`delete\`)');

        if (args[0] === 'join') {
            message.reply('Le bot a rejoint le thread!');
            if (thread.joinable) await thread.join();
        } else if (args[0] === 'leave') {
            message.reply('Le bot a quitté le thread!');
            await thread.leave();
        } else if (args[0] === 'archive') {
            await message.reply('Le thread est archivé!');
            await thread.setArchived(true);
        } else if (args[0] === 'unarchive') {
            message.reply('Le thread est déarchivé!');
            await thread.setArchived(false);
        } else if (args[0] === 'delete') {
            await thread.delete();
        }
    },
    options: [
        {
            name: 'join',
            description: "Joindre un thread",
            type: 'SUB_COMMAND',
        },
        {
            name: 'leave',
            description: "Quitter un thread",
            type: 'SUB_COMMAND',
        },
        {
            name: 'archive',
            description: "Archiver un thread",
            type: 'SUB_COMMAND',
        },
        {
            name: 'unarchive',
            description: "Déarchiver un thread",
            type: 'SUB_COMMAND',
        },
        {
            name: 'delete',
            description: "Supprimer un thread",
            type: 'SUB_COMMAND',
            options: [ { name: 'channel', type: 'STRING', description: 'ID du channel', require: true } ]
        },
    ],
    async runInteraction (client, interaction) {
        let thread = interaction.channel;
        if (!thread.isThread()) return interaction.reply('Impossible de taper cette commande car vous n\'etes pas dans un thread!');

        if (interaction.options.getSubcommand() === 'join') {
            interaction.reply('Le bot a rejoint le thread!');
            if (thread.joinable) await thread.join();
        } else if (interaction.options.getSubcommand() === 'leave') {
            interaction.reply('Le bot a rejoint le thread!');
            await thread.leave();
        } else if (interaction.options.getSubcommand() === 'archive') {
            await interaction.reply('Le thread est archivé!');
            await thread.setArchived(true);
        } else if (interaction.options.getSubcommand() === 'unarchive') {
            interaction.reply('Le thread est déarchivé!');
            await thread.setArchived(false);
        } else if (interaction.options.getSubcommand() === 'delete') {
            await thread.delete();
        }
    }
};
