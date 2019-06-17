const { proxy, server } = require('../app')
const config = require('../config/index')
const loggingService = require('../services/loggingService')
const proxyUtil = require('../util/proxyUtil')

const NODE_ENV = config.env('NODE_ENV', config.get('app.env', 'development'))
let PORT

NODE_ENV === 'testing' ? PORT = 3999 : PORT = config.get('app.port', 3000)
server.listen(PORT)

server.on('listening', function () {
  loggingService.info(`Listening on Port: ${PORT}; Target: ${config.env('TARGET', config.get('proxy.target'))}`)
  loggingService.debug(`NODE_ENV: ${process.env.NODE_ENV}`)
  loggingService.debug(`PORT: ${process.env.PORT}`)
  loggingService.debug(`LOGGING_LEVEL: ${process.env.LOGGING_LEVEL}`)
  loggingService.debug(`TARGET: ${process.env.TARGET}`)
  loggingService.debug(`APEX_INTERNET_POLICY: ${process.env.APEX_INTERNET_POLICY}`)
  loggingService.debug(`APEX_INTERNET_BASE_URL: ${process.env.APEX_INTERNET_BASE_URL}`)
  loggingService.debug(`APEX_INTERNET_SIGNING_APP_ID: ${process.env.APEX_INTERNET_SIGNING_APP_ID}`)
  loggingService.debug(`APEX_INTERNET_SIGNING_APP_SECRET: ${process.env.APEX_INTERNET_SIGNING_APP_SECRET}`)
  loggingService.debug(`APEX_INTERNET_SIGNING_KEY_FILE_PATH: ${process.env.APEX_INTERNET_SIGNING_KEY_FILE_PATH}`)
  loggingService.debug(`APEX_INTRANET_POLICY: ${process.env.APEX_INTRANET_POLICY}`)
  loggingService.debug(`APEX_INTRANET_BASE_URL: ${process.env.APEX_INTRANET_BASE_URL}`)
  loggingService.debug(`APEX_INTRANET_SIGNING_APP_ID: ${process.env.APEX_INTRANET_SIGNING_APP_ID}`)
  loggingService.debug(`APEX_INTRANET_SIGNING_APP_SECRET: ${process.env.APEX_INTRANET_SIGNING_APP_SECRET}`)
  loggingService.debug(`APEX_INTRANET_SIGNING_KEY_FILE_PATH: ${process.env.APEX_INTRANET_SIGNING_KEY_FILE_PATH}`)
})

server.on('error', function (err) {
  loggingService.error(err.stack)
  process.exit(1)
})

process.once('SIGTERM', function () {
  loggingService.info('SIGTERM received. Terminating')
  server.close(function () {
    process.exit(0)
  })
})

process.on('uncaughtException', function (err) {
  loggingService.error(err.stack)
})

process.on('unhandledRejection', function (err) {
  loggingService.error(err.stack)
})

proxy.on('error', err => {
  loggingService.error(err.stack)
})

proxy.on('proxyReq', (proxyReq, req, res, options) => {
  proxyUtil.setAuthorizationHeader(proxyReq, req, res, options)
})
