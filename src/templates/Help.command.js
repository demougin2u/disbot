const bot = require('../BotHelper').get()

module.exports = {
    name: 'help',
    help: 'Ce message',
    execute(message) {
        // Search all commands
        const fields = bot.commands
            // remove command without help
            .filter(command => command.help)
            // put this help first in command
            .sort((a, b) => {
                if (a.name === this.name) {
                    return -1
                }
                if (b.name === this.name) {
                    return 1
                }
                return 0
            })
            // map command for generate embed field items
            .map(command => ({
                name: `${process.env.COMMAND_START}${command.name}`,
                value: command.help
            }))

        message.reply({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: 'Liste des commandes',
                fields: fields,
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL
                }
            }
        })
    }
}
