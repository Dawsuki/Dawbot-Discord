const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unmute',
    category: 'moderation',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'unmute [@member]',
    examples: ['unmute @dawson'],
    description: 'Démute un utilisateur',
    async run (client, message, args) {
        const target = message.mentions.members.find(m => m.id);

        if (!target.isCommunicationDisabled()) return message.reply('Ce membre ne peut pas démute par le bot car il n\'est pas mute!');

        target.timeout(null);
        
        const embed = new MessageEmbed()
            .setColor('#21ff81')
            .setTitle('Unmute')
            .setDescription(`${target} a été démute`)
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
    options: [
        {
            name: 'target',
            description: "L'utilisateur a mute",
            type: 'USER',
            required: true,
        }
    ],
    async runInteraction (client, interaction) {
        const target = interaction.options.getMember('target');

        if (!target.isCommunicationDisabled()) return interaction.reply('Ce membre ne peut pas démute par le bot car il n\'est pas mute!');

        target.timeout(null);
        
        const embed = new MessageEmbed()
            .setColor('#21ff81')
            .setTitle('Unmute')
            .setDescription(`${target} a été démute`)
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    }
};
