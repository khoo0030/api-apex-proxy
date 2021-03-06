const { L1, L2, APEX_L1_EG, APEX_L2_EG, APEX_L1_IG, APEX_L2_IG } = require('../static/constants')
const { doesKeyFileExists, getKeyFilePath} = require('./keyFileUtil')
const config = require('../config/index')

module.exports = class apexSigningOptionsUtil {
  static getInternetOptions(method, urlPath) {
    const POLICY = config.env('APEX_INTERNET_POLICY', config.get('apex.internet.policy'))
    const BASE_URL = config.env('APEX_INTERNET_BASE_URL', config.get('apex.internet.baseUrl'))
    const APP_ID = config.env('APEX_INTERNET_SIGNING_APP_ID', config.get('apex.internet.signing.appId'))

    if (POLICY === L1) {
      return {
        appId: APP_ID,
        secret: config.env('APEX_INTERNET_SIGNING_APP_SECRET', config.get('apex.internet.signing.secret')),
        authPrefix: APEX_L1_EG,
        httpMethod: method,
        urlPath: `${BASE_URL}${urlPath}`
      }
    } else if (POLICY === L2) {
      const KEY_FILE = config.env('APEX_INTERNET_SIGNING_KEY_FILE_PATH', config.get('apex.internet.signing.keyFile'))
      if (doesKeyFileExists(KEY_FILE) === false) throw new Error(`Cannot find APEX internet key file ${KEY_FILE}`)

      return {
        appId: APP_ID,
        keyFile: getKeyFilePath(KEY_FILE),
        authPrefix: APEX_L2_EG,
        httpMethod: method,
        urlPath: `${BASE_URL}${urlPath}`,
      }
    } else {
      throw new Error('Must define a policy L1 or L2 for APEX internet API')
    }
  }

  static getIntranetOptions(method, urlPath) {
    const POLICY = config.env('APEX_INTRANET_POLICY', config.get('apex.intranet.policy'))
    const BASE_URL = config.env('APEX_INTRANET_BASE_URL', config.get('apex.intranet.baseUrl'))
    const APP_ID = config.env('APEX_INTRANET_SIGNING_APP_ID', config.get('apex.intranet.signing.appId'))

    if (POLICY === L1) {
      return {
        appId: APP_ID,
        secret: config.env('APEX_INTRANET_SIGNING_APP_SECRET', config.get('apex.intranet.signing.secret')),
        authPrefix: APEX_L1_IG,
        httpMethod: method,
        urlPath: `${BASE_URL}${urlPath}`
      }
    } else if (POLICY === L2) {
      const KEY_FILE = config.env('APEX_INTRANET_SIGNING_KEY_FILE_PATH', config.get('apex.intranet.signing.keyFile'))
      if (doesKeyFileExists(KEY_FILE) === false) throw new Error(`Cannot find APEX intranet key file ${KEY_FILE}`)

      return {
        appId: APP_ID,
        keyFile: getKeyFilePath(KEY_FILE),
        authPrefix: APEX_L2_IG,
        httpMethod: method,
        urlPath: `${BASE_URL}${urlPath}`,
      }
    } else {
      throw new Error('Must define a policy L1 or L2 for APEX intranet API')
    }
  }
}
