/** init devenv must be first code **/
const dotenv = require('dotenv')
const path = require('path')
const Logger = require('./src/Logger')

const pathLocalEnv = path.resolve(__dirname, '.env.local')
Logger.info(`Load environnement file in ${pathLocalEnv}`)
dotenv.config({ path: pathLocalEnv })

const pathEnv = path.resolve(__dirname, '.env')
Logger.info(`Load environnement file in ${pathEnv}`)
dotenv.config({ path: pathEnv })

/** Logger could be overwrite like you want */
const Logger = require('./src/Logger')
const BotHelper = require('./src/BotHelper')
const fs = require('fs')

process.on('uncaughtException', Logger.error)

const bot = BotHelper.get()
bot.on('error', Logger.error)

// Commands initialisation
const commandFolderPath = `${__dirname}/src/Commands`
const files = fs.readdirSync(commandFolderPath).filter(file => file.endsWith('command.js'))
files.forEach(file => {
    const command = require(`${commandFolderPath}/${file}`)
    bot.commands.set(command.name, command)
})

Logger.log('Bot is booting ...')
bot.login(process.env.BOT_TOKEN)
bot.on('ready', function () {
    Logger.log('Bot connected')
    bot.user.setActivity(`${process.env.COMMAND_START}help`, { type: 'LISTENING' })
})

process.on('SIGINT', () => {
    Logger.log('SIGINT detected, stop bot connections')
    bot.destroy()
        .then(() => {
            Logger.log('Bot is destroyed. Stop execution')
            process.exit()
        })
        .catch(process.exit)
})

bot.on('message', (message) => {
    if (message.author.bot || !message.content.startsWith(process.env.COMMAND_START)) return

    Logger.info(`Command from ${message.author.username} : ${message.content}`)

    const args = message.content.slice(process.env.COMMAND_START.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if (!bot.commands.has(command)) return

    try {
        const cmd = bot.commands.get(command)
        cmd.execute(message, args)
        message.delete()
    } catch (err) {
        Logger.error(err)
    }
})
