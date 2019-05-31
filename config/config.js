module.exports = {
  app: {
    env: 'development',
    port: 3000,
    logging: {
      level: 'debug',
    },
  },
  proxy: {
    target: 'http://localhost:7002',
    changeOrigin: true,
  }
}
