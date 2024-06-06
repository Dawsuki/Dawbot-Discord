module.exports = {
    name: 'roles-menu',
    async runInteraction(client, interaction) {
        const roles = ['1247793863851245688', '1247793941718499380', '1247794192034430987'];
        const memberRoles = interaction.member.roles.cache;
        const selectedRoleId = interaction.values[0];

        const rolesToRemove = roles.filter(role => memberRoles.has(role));

        for (const role of rolesToRemove) {
            await interaction.member.roles.remove(role);
        }

        await interaction.member.roles.add(selectedRoleId);

        const role = interaction.guild.roles.cache.get(selectedRoleId);

        await interaction.reply({ content: `Votre couleur a été mise à jour! ${role}`, ephemeral: true });
    },
};