const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const commandFolder = readdirSync('./commands');
const prefix = '$';

const contextDescription = {
    userinfo: 'Renvoie des informations sur l\'utilisateur'
}

module.exports = {
    name: "help",
    category: 'utils',
    permissions: [],
    ownerOnly: false,
    usage: 'help <commande>',
    examples: [`help`, `help ping`, `help emit`],
    description: "Renvoie une liste de commande filtrée par catégorie",
    async run(client, message, args) {
        if (!args.length) {
            const noArgsEmbed = new MessageEmbed()
                .setColor()
                .addField('Liste des commandes', `une liste de toutes les catégories disponible et leurs comamndes.\nPour plus d'informations sur une commande, tapez \`${prefix}help <command>\``)

            for (const category of commandFolder) {
                noArgsEmbed.addField(
                    `⠂${category.replace(/(^\w|s\w)/g, firstLetter => firstLetter.toUpperCase())}`,
                    `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``
                );
            }

            return message.channel.send({ embeds: [noArgsEmbed] });
        }

        const cmd = client.commands.get(args[0]);
        if (!cmd) return message.reply('Cette commande n\'existe pas!');

        const permissions = cmd.permissions.length > 0 ? cmd.permissions.map(perm => `\`${perm}\``).join(', ') : 'Aucune permission requise';
        const usage = cmd.usage ? `\`\`\`${prefix}${cmd.usage}\`\`\`` : 'Pas d\'utilisation spécifique';
        const examples = cmd.examples ? cmd.examples.map(example => `\`\`\`${prefix}${example}\`\`\``).join('\n') : 'Pas d\'exemples disponibles';
        const description = cmd.description || contextDescription[cmd.name];

        const argsEmbed = new MessageEmbed()
            .setColor()
            .setTitle(`\`${cmd.name}\``)
            .setDescription(description)
            .addFields(
                { name: 'Permission(s) requise(s)', value: permissions, inline: true },
                { name: 'Utilisation', value: usage, inline: false },
                { name: 'Exemples', value: examples, inline: false }
            )
            .setFooter({ text: cmd.ownerOnly ? '⚠️ Pour le créateur du bot uniquement ⚠️' : '' });

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

        const permissions = cmd.permissions.length > 0 ? cmd.permissions.map(perm => `\`${perm}\``).join(', ') : 'Aucune permission requise';
        const usage = cmd.usage ? `\`\`\`${prefix}${cmd.usage}\`\`\`` : 'Pas d\'utilisation spécifique';
        const examples = cmd.examples ? cmd.examples.map(example => `\`\`\`${prefix}${example}\`\`\``).join('\n') : 'Pas d\'exemples disponibles';
        const description = cmd.description || contextDescription[cmd.name];

        const argsEmbed = new MessageEmbed()
            .setColor()
            .setTitle(`\`${cmd.name}\``)
            .setDescription(description)
            .addFields(
                { name: 'Permission(s) requise(s)', value: permissions, inline: true },
                { name: 'Utilisation', value: usage, inline: false },
                { name: 'Exemples', value: examples, inline: false }
            )
            .setFooter({ text: cmd.ownerOnly ? '⚠️ Pour les admins du bot uniquement ⚠️' : '' });

        return interaction.reply({ embeds: [argsEmbed], ephemeral: true });
    }
};