/**
 * Here it is a logger object, you can overwrite it to log as you want
 * This one is basic, it add current date and time before message, and use console functions
 */

const ERROR_TYPE     = 'error'
const INFO_TYPE      = 'info'
const LOG_TYPE       = 'log'
const WARNING_TYPE   = 'warn'

const formatMessage = message => {
    const dateFormater = new Intl.DateTimeFormat("default", {
        year: "numeric", 
        month: "2-digit", 
        day: "2-digit",
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit",
        hour12: false
    })
    if (message === undefined) message = 'undefined message'
    return `${dateFormater.format(new Date())} => ${message.stack ? message.stack : message}`
}
    
const logFn = (message, type = LOG_TYPE) => console[type](formatMessage(message))

module.exports = {
    error:   message => logFn(message, ERROR_TYPE),
    info:    message => logFn(message, INFO_TYPE),
    log:     message => logFn(message, LOG_TYPE),
    warn:    message => logFn(message, WARNING_TYPE),
}
