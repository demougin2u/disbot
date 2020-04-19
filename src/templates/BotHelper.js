const Discord = require('discord.js')
const Logger = require('./Logger')

let bot = null

module.exports = {
    get: () => {
        if (!bot) {
            Logger.log(`Generate new client`)
            bot = new Discord.Client()
            bot.commands = new Discord.Collection()
        }
        return bot
    }
    /**
     * Add here helper method. Like a function for rename a given channel, etc
     */
}
