module.exports = {
    name: 'clear',
    category: 'moderation',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'clear [amount] <@target>',
    examples: ['clear 50','clear 50 @dawson'],
    description: 'Supprimer un mombre de message spécifié sur un salon ou un utilisateur',
    async run (client, message, args) {
        const amountToDelete = args[0];
        if (isNaN(amountToDelete) || !args[0] || amountToDelete > 100 || amountToDelete < 1) return message.reply('le NOMBRE doit être entre 1 à 100');
        const target = message.mentions.users.find(u => u.id);
        await message.delete();

        const messagesToDelete = await message.channel.messages.fetch();

        if (target) {
            let i = 0;
            const filteredTargetMessages = [];
            (await messagesToDelete).filter(msg => {
                if (msg.author.id == target.id && amountToDelete > i) {
                    filteredTargetMessages.push(msg); i++;
                }
            });

            await message.channel.bulkDelete(filteredTargetMessages, true).then(messages => {
                message.channel.send(`J'ai supprimé ${messages.size} message sur l'utilisateur ${target}!`).then(sentMessage => {
                    setTimeout(() => sentMessage.delete(), 3000);
                });
            });
        } else {
            await message.channel.bulkDelete(amountToDelete, true).then(messages => {
                message.channel.send(`J'ai supprimé ${messages.size} message sur ce salon!`).then(sentMessage => {
                    setTimeout(() => sentMessage.delete(), 3000);
                })
            });
        }
    },
    options: [
        {
            name: 'message',
            description: 'Le nombre de message à supprimer',
            type: 'NUMBER',
            required: true,
        },
        {
            name: 'target',
            description: "Sélectionner l'utilisateur pour la suppression de message",
            type: 'USER',
            required: false,
        },
    ],
    async runInteraction (client, interaction) {
        const amountToDelete = interaction.options.getNumber('message');
        if (amountToDelete > 100 || amountToDelete < 1) return interaction.reply('le nombre doit être entre 1 à 100');
        const target = interaction.options.getMember('target')

        const messagesToDelete = await interaction.channel.messages.fetch();

        if (target) {
            let i = 0;
            const filteredTargetMessages = [];
            (await messagesToDelete).filter(msg => {
                if (msg.author.id == target.id && amountToDelete > i) {
                    filteredTargetMessages.push(msg); 
                    i++;
                }
            });

            await interaction.channel.bulkDelete(filteredTargetMessages, true).then(messages => {
                interaction.reply(`J'ai supprimé ${messages.size} messages de l'utilisateur ${target}!`);
                setTimeout(() => interaction.deleteReply(), 3000);
            });
        } else {
            await interaction.channel.bulkDelete(amountToDelete, true).then(messages => {
                interaction.reply(`J'ai supprimé ${messages.size} messages dans ce salon!`);
                setTimeout(() => interaction.deleteReply(), 3000);
            });
        }
    }
};
