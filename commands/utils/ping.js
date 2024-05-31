const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'utils',
    permissions: [],
    ownerOnly: false,
    usage: 'ping',
    examples: ['ping'],
    description: "La commande ping renvoie la latence du bot et de l'API",
    async run(client, message, args) {

        const tryPong = await message.channel.send("Envoi d’une requête 'ping' sur discord.com [162.159.128.233]..");

        const embed = new MessageEmbed()
            .setTitle('🏓 Pong!')
            .setURL('https://discordstatus.com/')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: 'Latence API', value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true },
                { name: 'Latence BOT', value: `\`\`\`${tryPong.createdTimestamp - message.createdTimestamp}ms\`\`\``, inline: true },
                { name: 'Uptime', value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true },
            )
            .setTimestamp()
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() });

        tryPong.edit({ content: ' ', embeds: [embed] });
    },
    async runInteraction(client, interaction) {

        const tryPong = await interaction.reply({ content: "Envoi d’une requête 'ping' sur discord.com [162.159.128.233]..", fetchReply: true});

        const embed = new MessageEmbed()
            .setTitle('🏓 Pong!')
            .setURL('https://discordstatus.com/')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: 'Latence API', value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true },
                { name: 'Latence BOT', value: `\`\`\`${tryPong.createdTimestamp - interaction.createdTimestamp}ms\`\`\``, inline: true },
                { name: 'Uptime', value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true },
            )
            .setTimestamp()
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });


        interaction.editReply({ content: ' ', embeds: [embed] });
    },
};