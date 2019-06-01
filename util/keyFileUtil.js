const fs = require('fs')
const path = require('path')

const STATIC_DIRECTORY_NAME = 'static'

module.exports = class keyFileUtil {
  static getKeyFilePath(keyFile) {
    return path.resolve(process.cwd(), STATIC_DIRECTORY_NAME, keyFile)
  }

  static doesKeyFileExists(keyFile) {
    return fs.existsSync(path.resolve(process.cwd(), STATIC_DIRECTORY_NAME, keyFile))
  }
}
