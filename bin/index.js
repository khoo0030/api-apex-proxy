const { proxy, server } = require('./../app')
const config = require('../config/index')
const loggingService = require('../services/loggingService')

const NODE_ENV = config.env('NODE_ENV', config.get('app.env', 'development'))
let PORT

NODE_ENV === 'testing' ? PORT = 3999 : PORT = config.get('app.port', 3000)
server.listen(PORT)

server.on('listening', function () {
  loggingService.info(`Listening on Port: ${PORT}; Target: ${config.env('TARGET', config.get('proxy.target'))}`)
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
  loggingService.info(`Proxy path: ${req.url}`)
  // proxyReq.setHeader('Authorization', getAuthorizationHeader(req.method, req.url));
});
