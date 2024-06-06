module.exports = {
    name: 'lock',
    category: 'moderation',
    permissions: ['MANAGE_CHANNELS'],
    ownerOnly: false,
    usage: 'lock',
    examples: ['lock'],
    description: 'Verouiller un salon',
    async run (client, message, args) {
        await message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: false });
        await message.reply({ content: "🔒 Le salon est verouillé! 🔒"});
    },
    async runInteraction (client, interaction) {
        await interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: false });
        await interaction.reply({ content: "🔒 Le salon est verouillé! 🔒", ephemeral:true });
    }
};
