const Logger = require('../Logger')

module.exports = {
    name: '{{name}}',
    help: {{message}},
    execute(message, args) {
        Logger.info(`Run command ${this.name}`)
    }
}
