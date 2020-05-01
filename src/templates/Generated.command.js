const Logger = require('../Logger')

module.exports = {
    name: '{{name}}',
    help: false,
    execute(message, args) {
        Logger.info(`Run command ${this.name}`)
    }
}
