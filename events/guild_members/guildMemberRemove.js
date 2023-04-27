const { MessageEmbed, Formatters } = require('discord.js');
const dayjs = require('dayjs');

module.exports = {
    name: "guildMemberRemove",
    once: false,
    async execute(client, member) {
        const creationTimestamp = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime);
        const remativeCreationTimestamp = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.RelativeTime);
        const joinimestamp = Formatters.time(dayjs (member.joinedTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime);
        const remativejoinimestamp = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.RelativeTime);
        const leftimestamp = Formatters.time(dayjs().unix(), Formatters.TimestampStyles.ShortDateTime);
        const remativeleftimestamp = Formatters.time(dayjs().unix(), Formatters.TimestampStyles.RelativeTime);


        const embed = new MessageEmbed()
            .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
            .setColor('#dc143c')
            .setDescription(`• Nom d'utilisateur: ${member}
            • Crée le: ${creationTimestamp} (${remativeCreationTimestamp})
            • Rejoint le: ${joinimestamp} (${remativejoinimestamp})
            • Quitté le: ${leftimestamp} (${remativeleftimestamp})
            `)
            .setTimestamp()
            .setFooter({ text: '📤 L\'utilisateur a quitté..' });

        const logChannel = client.channels.cache.get('1088682471924707378');
        logChannel.send({ embeds: [embed] });
    },
};