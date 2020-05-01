const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

module.exports = (name, options = {}) => {
    console.log(`Create discord app with name ${name} at ${process.cwd()}`)
    const targetDir = path.resolve(process.cwd(), name)
    if (fs.existsSync(targetDir)) {
        console.error(chalk.red(`Error : Directory ${name} already exist at ${process.cwd()}`))
        process.exit(1)
    }

    fs.mkdirSync(targetDir)

    const package = {
        name: name,
        version: "0.0.1",
        description: "A bot discord generated with disbot",
        main: `${name}.js`,
        dependencies: {
            'discord.js': "^11.4.2",
            dotenv: "^8.2.0",
        },
    }

    fs.writeFileSync(
        path.resolve(targetDir, 'package.json'),
        `${JSON.stringify(package)}\n`
    )

    const readme = [
        `# ${name}`,
        'A bot discord for fun',
        '',
        '## Configuration',
        'Create your own `local.env` for override.env parameters (or set directly environment variable on your system)',
        '',
        '## Installation',
        'To make an installation, just run `npm install`',
        '',
        '## Run application',
        `To run the bot application, run \`node ${name}.js\` and have fun :)`,
        ''
    ].join('\n')

    fs.writeFileSync(
        path.resolve(targetDir, 'README.md'),
        readme
    )

    const dotenv = {
        COMMAND_START: options.prefix !== undefined ? options.prefix : '/',
        BOT_TOKEN: options.token !== undefined ? options.token : 'PUT_YOUR_TOKEN_HERE'
    }

    fs.writeFileSync(
        path.resolve(targetDir, '.env'),
        `${Object.entries(dotenv).map(([key, value]) => `${key}="${value}"`).join('\n')}\n`
    )

    const gitignore = [
        'local.env',
        ''
    ].join('\n')

    fs.writeFileSync(
        path.resolve(targetDir, '.gitignore'),
        gitignore
    )

    //Prepare copy templates files
    const targetTree = {
        'bot.js': `${name}.js`,
        src: {
            Commands: {
                'Help.command.js': 'Help.command.js'
            },
            'BotHelper.js': 'BotHelper.js',
            'Logger.js': 'Logger.js'
        }
    }

    generateFiles(targetTree, targetDir)
}

const templatesPath = path.resolve(__dirname, 'templates')

function generateFiles(targetTree, currentPath = '') {
    for (let [key, value] of Object.entries(targetTree)) {
        if (typeof value === 'object') {
            generateFiles(value, path.resolve(currentPath, key))
            continue
        }

        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath, { recursive: true })
        }

        const templatesFilePath = path.resolve(templatesPath, key)
        const targetFilePath = path.resolve(currentPath, value)
        fs.copyFileSync(templatesFilePath, targetFilePath)
    }
}