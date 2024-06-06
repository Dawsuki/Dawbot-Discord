const ms = require('ms');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'mute',
    category: 'moderation',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'mute [@member] [duration] [reason]',
    examples: ['mute @dawson 5m raison'],
    description: 'Mute un utilisateur temporairement avec une raison',
    async run (client, message, args) {
        if (!args[0]) return message.reply('Spécifier un membre à mute!');
        if (!args[1]) return message.reply('Spécifier la durée du mute!');
        if (!args[2]) return message.reply('Spécifier la raison du mute!');

        const target = message.mentions.members.first();
        if (!target) return message.reply('Membre non trouvé ou invalide!');

        const duration = args[1];
        const convertedTime = ms(duration);
        const reason = args.slice(2).join(' ');

        if (!target.moderatable) return message.reply('Ce membre ne peut pas être mute par le bot!');
        if (!convertedTime) return message.reply('Spécifier une durée valable!');

        target.timeout(convertedTime, reason);

        const unmuteTimestamp = Math.floor((Date.now() + convertedTime) / 1000);

        const embed = new MessageEmbed()
            .setColor('#dc143c')
            .setTitle('Mute')
            .setDescription(`${target} a été mute`)
            .addFields(
                { name: 'Durée', value: `\`\`\`${duration}\`\`\``, inline: true },
                { name: 'Raison', value: `\`\`\`${reason}\`\`\``, inline: true },
                { name: 'Démute', value: `<t:${unmuteTimestamp}:R>`, inline: false }
            )
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
    options: [
        {
            name: 'target',
            description: "L'utilisateur a mute",
            type: 'USER',
            required: true,
        },
        {
            name: 'duration',
            description: "La durée du mute",
            type: 'STRING',
            required: true,
        },
        {
            name: 'reason',
            description: "La raison du mute",
            type: 'STRING',
            required: true,
        },
    ],
    async runInteraction (client, interaction) {
        const target = interaction.options.getMember('target');
        if (!target) return interaction.reply('Membre non trouvé ou invalide!');

        const duration = interaction.options.getString('duration');
        const convertedTime = ms(duration);
        const reason = interaction.options.getString('reason');

        if (!target.moderatable) return interaction.reply('Ce membre ne peut pas être mute par le bot!');
        if (!convertedTime) return interaction.reply('Spécifier une durée valable!');

        target.timeout(convertedTime, reason);

        const unmuteTimestamp = Math.floor((Date.now() + convertedTime) / 1000);
        
        const embed = new MessageEmbed()
            .setColor('#dc143c')
            .setTitle('Mute')
            .setDescription(`${target} a été mute`)
            .addFields(
                { name: 'Durée', value: `\`\`\`${duration}\`\`\``, inline: true },
                { name: 'Raison', value: `\`\`\`${reason}\`\`\``, inline: true },
                { name: 'Démute', value: `<t:${unmuteTimestamp}:R>`, inline: false }
            )
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    }
};
