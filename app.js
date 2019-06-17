const config = require('./config/index')
const http = require('http')
const httpProxy = require('http-proxy')
const morgan = require('morgan')
const loggingService = require('./services/loggingService')

const options = {
  target: config.env('TARGET', config.get('proxy.target')),
  changeOrigin: config.env('TARGET', config.get('proxy.changeOrigin')),
}

const proxy = httpProxy.createProxyServer(options)

const requestLogger = morgan('combined', { stream: loggingService.stream })

const server = http.createServer((req, res) => {
  requestLogger(req, res, () => {
    proxy.web(req, res, {})
  })
})

module.exports.proxy = proxy
module.exports.server = server
