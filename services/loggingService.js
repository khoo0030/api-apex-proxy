const config = require('./../config/index')
const path = require('path')
const winston = require('winston')

const NODE_ENV = config.env('NODE_ENV', config.get('app.env'))
const LOGGING_LEVEL = config.env('LOGGING_LEVEL', config.get('app.logging.level', NODE_ENV === 'production' ? 'debug' : 'info'))

const format = winston.format

const options = {
  file: {
    level: LOGGING_LEVEL,
    format: format.combine(
      format.metadata({fillExcept: ['level', 'label', 'timestamp', 'message']}),
      format.json()
    ),
    filename: path.resolve(process.cwd(), 'logs', 'winston.log'),
    handleExceptions: true,
    json: true,
    colorize: false,
  },
  console: {
    level: LOGGING_LEVEL,
    format: format.combine(
      format.simple(),
    ),
    handleExceptions: true,
    json: false,
    colorize: true,
  },
}

const loggingService = winston.createLogger({
  format: format.combine(
    format.timestamp(),
  ),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false,
})

loggingService.stream = {
  // eslint-disable-next-line no-unused-vars
  write: function(message, encoding) {
    loggingService.info(message)
  },
}

module.exports = loggingService
