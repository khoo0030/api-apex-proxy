const { L0, L1, L2 } = require('../static/constants')
const _ = require('lodash')
const apexApiSigningUtil = require('./apexApiSigningUtil')
const config = require('../config/index')
const loggingService = require('../services/loggingService')

const APEX_INTERNET_POLICY = config.env('APEX_INTERNET_POLICY', config.get('apex.internet.policy'))
const APEX_INTRANET_POLICY = config.env('APEX_INTRANET_POLICY', config.get('apex.intranet.policy'))

module.exports = class proxyUtil {
  // eslint-disable-next-line no-unused-vars
  static setAuthorizationHeader(proxyReq, req, res, options) {
    loggingService.debug(`APEX internet policy: ${APEX_INTERNET_POLICY}; APEX intranet policy: ${APEX_INTRANET_POLICY}`)

    if (APEX_INTERNET_POLICY === L0 && APEX_INTRANET_POLICY === L0) return this

    return proxyReq.setHeader('Authorization', this.buildApexAuthorizationHeader(req.method, req.url))
  }

  static buildApexAuthorizationHeader(method, url) {
    let header = []

    if (APEX_INTRANET_POLICY === L1 || APEX_INTRANET_POLICY === L2) {
      const result = apexApiSigningUtil.generateApexIntranetHeader(method, url)
      loggingService.debug(result)
      header.push(result)
    }

    if (APEX_INTERNET_POLICY === L1 || APEX_INTERNET_POLICY === L2) {
      const result = apexApiSigningUtil.generateApexInternetHeader(method, url)
      loggingService.debug(result)
      header.push(result)
    }

    return _.join(header, ', ')
  }
}
