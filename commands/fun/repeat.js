const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'repeat',
    category: 'fun',
    permissions: [],
    ownerOnly: false,
    usage: 'repeat',
    examples: ['repeat'],
    description: 'Répète ce que tu dis',
    async run (client, message, args) {
        if (!args.length) return message.reply('Vous devez fournir un message à répéter!');

        const repeatMessage = args.join(' ');

        await message.delete();

        const sentMessage = await message.channel.send(repeatMessage);

        const messageLink = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${sentMessage.id}`;

        const embed = new MessageEmbed()
            .setColor('#FFFF00')
            .setAuthor({ name: `${message.author.tag} (${message.author.id})`, iconURL: message.author.displayAvatarURL() })
            .setDescription(`• Message repeat par ${message.author} dans ${messageLink}

                ${repeatMessage}

                • Date du : <t:${Math.floor(message.createdTimestamp / 1000)}:f> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)
            `)
            .setFooter({ text: '📨 • repeat' })
            .setTimestamp();

        const logChannel = client.channels.cache.get('1242920553854140467'); 
        if (logChannel) {
            logChannel.send({ embeds: [embed] });
        } else {
            console.error('Le canal de logs spécifié est introuvable.');
        }
    },
    options: [
        {
            name: 'message',
            description: "Votre message..",
            type: 'STRING',
            required: true,
        },
    ],
    async runInteraction (client, interaction) {
        const repeatMessage = interaction.options.getString('message');

        await interaction.reply({ content: 'Message reçu!', ephemeral: true });

        const sentMessage = await interaction.channel.send(repeatMessage);

        const messageLink = `https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${sentMessage.id}`;

        const embed = new MessageEmbed()
        .setColor('#FFFF00')
        .setAuthor({ name: `${interaction.user.tag} (${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL() })
        .setDescription(`• Message repeat par ${interaction.user} dans ${messageLink}

            ${repeatMessage}

            • Date du : <t:${Math.floor(interaction.createdTimestamp / 1000)}:f> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)
        `)
        .setFooter({ text: '📨 • repeat' })
        .setTimestamp();

        const logChannel = client.channels.cache.get('1242920553854140467');
        if (logChannel) {
            logChannel.send({ embeds: [embed] });
        } else {
            console.error('Le canal de logs spécifié est introuvable.');
        }
    }
};
