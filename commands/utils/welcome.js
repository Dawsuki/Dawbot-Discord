const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const buttons = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('accept-button')
            .setLabel('Accepter ✅')
            .setStyle('SUCCESS'),

        new MessageButton()
            .setCustomId('refuse-button')
            .setLabel('Refuser ❌')
            .setStyle('DANGER'),
    )


const welcomeEmbed = new MessageEmbed()
    .setTitle('Charte du serveur')
    .addFields(
        { name: 'Règles', value: `On reste poli et courtois, pas d'insulte.

        Respecter les thèmes des Channel de discutions.

        Proposez vos idées (ça sera débattu "sondage").

        c'est tout pour le moment...

        Amusez-vous bien !!`, inline: true },
    )

module.exports = {
    name: 'welcome',
    category: 'utils',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'welcome',
    examples: ['welcome'],
    description: "La commande welcome permet d'envoyer l'embed des règle",
    async run(client, message, args) {
        await message.channel.send({ embeds: [welcomeEmbed], components: [buttons] });
    },
    async runInteraction(client, interaction) {
        await interaction.reply({ embeds: [welcomeEmbed], components: [buttons] });
    },
};