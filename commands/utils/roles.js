const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');

const selectMenu = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('roles-menu')
            .setPlaceholder('Choisir un rôle dans la liste')
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions([
                {
                    label: 'Bleu',
                    value: '1247793863851245688',
                    emoji: '1247819770120769588'
                },
                {
                    label: 'Orange',
                    value: '1247793941718499380',
                    emoji: '1247819892149977099'
                },
                {
                    label: 'Rouge',
                    value: '1247794192034430987',
                    emoji: '1247819894049869846'
                },
            ])
    );

module.exports = {
    name: 'roles',
    category: 'utils',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'roles',
    examples: ['roles'],
    description: "test roles",
    async run(client, message, args) {
        const roles = [
            '1247793863851245688', // Bleu
            '1247793941718499380', // Orange
            '1247794192034430987'  // Rouge
        ];

        const roleMentions = roles.map(roleId => {
            const role = message.guild.roles.cache.get(roleId);
            return role ? `${role}` : null;
        }).filter(role => role !== null).join('\n');

        const embed = new MessageEmbed()
            .setTitle('Choisissez votre couleur')
            .addField('🎨', roleMentions)

        await message.channel.send({ embeds: [embed], components: [selectMenu] });
    },
    async runInteraction(client, interaction) {
        const roles = [
            '1247793863851245688', // Bleu
            '1247793941718499380', // Orange
            '1247794192034430987'  // Rouge
        ];

        const roleMentions = roles.map(roleId => {
            const role = interaction.guild.roles.cache.get(roleId);
            return role ? `${role}` : null;
        }).filter(role => role !== null).join('\n');

        const embed = new MessageEmbed()
            .setTitle('Choisissez votre couleur')
            .addField('🎨',roleMentions)

        await interaction.reply({ embeds: [embed], components: [selectMenu] });
    },
};