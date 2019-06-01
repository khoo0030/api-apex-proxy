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
  },
  apex: {
    internet: {
      policy: 'L2', // L0/L1/L2
      baseUrl: 'https://my.apex.internet.api/endpoint',
      signing: {
        appId: 'my-app-id',
        secret: 'my-app-secret',
        keyFile: '.keyFile',
      },
    },
    intranet: {
      policy: 'L2', // L0/L1/L2
      baseUrl: 'https://my.apex.intranet.api/endpoint',
      signing: {
        appId: 'my-app-id',
        secret: 'my-app-secret',
        keyFile: '.keyFile',
      },
    },
  }
}
