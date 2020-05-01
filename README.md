# Disbot

Bootstrap Discord bot easily

## Install
```
npm install -g disbot
```

## Usage
You can check CLI help with :
```
disbot --help
```

For create a simple project, use:
```
disbot create <app_name>
```

You can specify token and/or command prefix with options `-t` and `-p` :
```
disbot create MyApp -t MY_BOT_TOKEN -p /mybot_
```

## Documentation
The generated project use dotenv. It generate a `.env` file with basic variable, but you can overwrite theses variables in a `local.env` file

### Commands
The commands are in `src/Commands` folder and are named like `command_name.command.js`
One command has a name, help string and a `execute` function.
- The name correspond to the command watched by the bot. For example, a command named `foo` will executed by the bot if someone write `/foo`
- The help is for generate help message, if undefined or false, the command will not displayed to help message
- The function accept two parameters, a [message object](https://discord.js.org/#/docs/main/stable/class/Message) and an array (args)

## Project tree
```
project
├── .env
├── .gitignore
├── README.md
├── package.json
├── src
│   ├── BotHelper.js
│   ├── Commands
│   │   └── Help.command.js
│   └── Logger.js
└── project.js
```