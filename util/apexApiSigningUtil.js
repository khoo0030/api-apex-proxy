const apiSigningUtil = require('node-apex-api-security').ApiSigningUtil
const { getInternetOptions, getIntranetOptions } = require('./apexSigningOptionsUtil')

module.exports = class apexApiSigningUtil {
  static generateApexInternetHeader(method, urlPath) {
    return apiSigningUtil.getSignatureToken(getInternetOptions(method, urlPath))
  }

  static generateApexIntranetHeader(method, urlPath) {
    return apiSigningUtil.getSignatureToken(getIntranetOptions(method, urlPath))
  }
}
