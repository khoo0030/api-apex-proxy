const config = require('./../config/index')
const winston = require('winston')

const NODE_ENV = config.env('NODE_ENV', config.get('app.env', 'development'))
const LOGGING_LEVEL = config.env('LOGGING_LEVEL', config.get('app.logging.level', NODE_ENV === 'production' ? 'debug' : 'info'))

const format = winston.format

const loggingService = winston.createLogger({
  level: LOGGING_LEVEL,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.simple()
      ),
    })
  ]
})

module.exports = loggingService
