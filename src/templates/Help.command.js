const bot = require('../BotHelper').get()

module.exports = {
    name: 'help',
    execute(message) {
        message.reply({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: 'Commands list',
                fields: [
                    {
                        name: `${process.env.COMMAND_START}help`,
                        value: `Show this message`
                    },
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL
                }
            }
        })
    }
}
