const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'userinfo',
    category: 'contextuel',
    permissions: [],
    ownerOnly: false,
    usage: 'Utiliser le menu contextuel de Discord!',
    examples: ['Utiliser le menu contextuel de Discord!'],
    type: 'USER',
    async runInteraction(client, interaction) {
            const member = await interaction.guild.members.fetch(interaction.targetId);


            const spotifyEmoji = '<:Spotify:1242966948799578232>';
            const crunchyrollEmoji = '<:Crunchyroll:1242974048367935550>';

            let activity = 'Rien de spécial';
            if (member.presence && member.presence.activities.length > 0) {
                const currentActivity = member.presence.activities[0];
                if (currentActivity.type === 'PLAYING') {
                    activity = `Joue à ${currentActivity.name}`;
                } else if (currentActivity.type === 'LISTENING' && currentActivity.name === 'Spotify') {
                    activity = `${spotifyEmoji} Écoute Spotify : ${currentActivity.details} par ${currentActivity.state}`;
                } else if (currentActivity.type === 'WATCHING' && currentActivity.name === 'Crunchyroll') {
                    activity = `${crunchyrollEmoji} Regarde Crunchyroll : ${currentActivity.details}`;
                } else if (currentActivity.type === 'CUSTOM_STATUS') {
                    activity = `${currentActivity.details}`;
                } else {
                    activity = `${currentActivity.type.charAt(0).toUpperCase() + currentActivity.type.slice(1).toLowerCase()} ${currentActivity.name}`;
                }
            }

            
            const embed = new MessageEmbed()
                .setAuthor( {  name : `${member.user.tag} (${member.id})`})
                .setColor(member.displayHexColor)
                .setImage(member.user.displayAvatarURL())
                .setFields(
                    { name: 'Nom', value: `${member}`, inline:true },
                    { name: 'Modérateur', value: `${member.kickable ? '🔴' : '🟢'}`, inline:true },
                    { name: 'Bot', value: `${member.user.bot ? '🟢' : '🔴'}`, inline:true },
                    { name: 'Roles', value: `${member.roles.cache.map(role => role).join(', ').replace(', @everyone', ' ')}` },
                    { name: 'A crée son compte le', value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)` },
                    { name: 'A rejoint le serveur le', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)` },
                    { name: 'Activité', value: activity},

                );


        interaction.reply({ embeds: [embed], ephemeral:true });
    }
};