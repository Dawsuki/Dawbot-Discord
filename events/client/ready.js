const Logger = require('../../utils/Logger');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        let guildsCount = await client.guilds.fetch();
        let usersCount =  client.guilds.cache.reduce((a, g) => a + g.memberCount, -2);

        Logger.client('Je suis prêt!');

        const customStatuses = [
            //{ name: 'sur Twitch de temps en temps', type: 'STREAMING', url: 'https://www.twitch.tv/dawsuki_doki' },
            //{ name: 'Minecraft', type: 'PLAYING' },
            //{ name: 'Spotify', type: 'LISTENING' },
            //{ name: 'rendre le monde meilleur', type: 'COMPETING' },
            { name: `${usersCount} Utilisateurs 👀`, type: 'WATCHING' },
            { name: 'Dawson 👀', type: 'WATCHING' },
        ];

        let customStatusIndex = 0;
        const checkInterval = 180000;

        const updatePresence = () => {
            const yourUserId = '351039484982460420';
            const yourPresence = client.guilds.cache.reduce((presence, guild) => {
                const member = guild.members.cache.get(yourUserId);
                return member ? member.presence : presence;
            }, null);

            if (yourPresence && yourPresence.activities.length > 0) {
                const activity = yourPresence.activities[0];
                client.user.setPresence({
                    activities: [{ name: `${activity.name} avec Dawson`, type: activity.type }],
                    status: yourPresence.status
                });
            } else {
                const customStatus = customStatuses[Math.floor(Math.random() * customStatuses.length)];
                client.user.setPresence({
                    activities: [{ name: customStatus.name, type: customStatus.type, url: customStatus.url || null }],
                    status: 'online'
                });
                customStatusIndex = (customStatusIndex + 1) % customStatuses.length;
            }
        };

        updatePresence();

        setInterval(updatePresence, checkInterval);

        const devGuild = await client.guilds.cache.get('1242059701324218419');
        devGuild.commands.set(client.commands.map(cmd => cmd));
    },
};
