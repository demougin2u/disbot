const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

module.exports = (name, options = {}) => {
    console.log(`Generate commande ${name}`)
    const targetDir = path.resolve(process.cwd(), 'src', 'Commands')
    if (!fs.existsSync(targetDir)) {
        console.error(chalk.red(`Error : Directory ${targetDir} not found`))
        process.exit(1)
    }

    const commandPath = path.resolve(__dirname, 'templates', 'Generated.command.js')

    let commandText = fs.readFileSync(commandPath, 'utf-8')
    commandText = commandText.replace('{{name}}', name)

    const commandFileName = `${name.charAt(0).toUpperCase()}${name.slice(1)}.command.js`
    const targetPath = path.resolve(targetDir, commandFileName)

    fs.writeFileSync(targetPath, commandText, 'utf-8')
    console.log(`Command generated at ${targetPath}`)
}