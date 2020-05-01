const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

module.exports = (name, options = {}) => {
    console.info(`Generate commande ${name}`)
    const targetDir = path.resolve(process.cwd(), 'src', 'Commands')
    if (!fs.existsSync(targetDir)) {
        console.error(chalk.red(`Error : Directory ${targetDir} not found`))
        process.exit(1)
    }

    const commandFileName = `${name.charAt(0).toUpperCase()}${name.slice(1)}.command.js`
    const targetPath = path.resolve(targetDir, commandFileName)

    if (fs.existsSync(targetPath)) {
        console.error(chalk.red(`Error : Command ${targetPath} already exist`))
        process.exit(1)
    }

    const templateCommandPath = path.resolve(__dirname, 'templates', 'Generated.command.js')
    let commandText = fs.readFileSync(templateCommandPath, 'utf-8')
    let message = false

    if (options.message) {
        // We replace ' by \' to avoid js error
        message = `'${options.message.replace(/'/g, "\\'")}'`
    }

    commandText = commandText
        .replace('{{name}}', name)
        .replace('{{message}}', message)

    fs.writeFileSync(targetPath, commandText, 'utf-8')
    console.info(chalk.green(`Command generated at ${targetPath}`))
}