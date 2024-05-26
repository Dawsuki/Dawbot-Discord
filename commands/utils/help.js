const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const commandFolder = readdirSync('./commands');
const prefix = '$';

module.exports = {
    name: "help",
    category: 'utils',
    permissions: [],
    description: "Commande help",
    async run(client, message, args) {
        if (!args.length) {
            const noArgsEmbed = new MessageEmbed()
                .setColor()
                .addField('Liste des commandes', `une liste de toutes les catégories disponible et leurs comamndes.\nPour plus d'informations sur une commande, tapez \`${prefix}help <command>\``)

            for (const category of commandFolder) {
                noArgsEmbed.addField(
                    `⠂${category.toUpperCase()}`,
                    `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``
                );
            }

            return message.channel.send({ embeds: [noArgsEmbed] });
        }

        const cmd = client.commands.get(args[0]);
        if (!cmd) return message.reply('Cette commande n\'existe pas!');

        const permissions = cmd.permissions.length > 0 ? cmd.permissions.join(', ') : 'Aucune permission requise';
        const argsEmbed = new MessageEmbed()
            .setColor()
            .setTitle(`\`${cmd.name}\``)
            .setDescription(cmd.description)
            .setFooter({ text: `Permission(s) requise(s): ${permissions}` });

        return message.channel.send({ embeds: [argsEmbed] });

    },
    options: [
        {
            name: "command",
            description: "Taper le nom de votre commande",
            type: "STRING",
            require: false,
        }
    ],
    async runInteraction(client, interaction) {
        const cmdName = interaction.options.getString('command');

        if (!cmdName) {
            const noArgsEmbed = new MessageEmbed()
                .setColor()
                .addField('Liste des commandes', `une liste de toutes les catégories disponible et leurs comamndes.\nPour plus d'informations sur une commande, tapez \`${prefix}help <command>\``)

            for (const category of commandFolder) {
                noArgsEmbed.addField(
                    `⠂${category.toUpperCase()}`,
                    `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``
                );
            }

            return interaction.reply({ embeds: [noArgsEmbed], ephemeral: true });
        }

        const cmd = client.commands.get(cmdName);
        if (!cmd) return interaction.reply({ content: 'Cette commande n\'existe pas!' , ephemeral: true });

        const permissions = cmd.permissions.length > 0 ? cmd.permissions.join(', ') : 'Aucune permission requise';
        const argsEmbed = new MessageEmbed()
            .setColor()
            .setTitle(`\`${cmd.name}\``)
            .setDescription(cmd.description)
            .setFooter({ text: `Permission(s) requise(s): ${permissions}` });

        return interaction.reply({ embeds: [argsEmbed], ephemeral: true });
    }
};