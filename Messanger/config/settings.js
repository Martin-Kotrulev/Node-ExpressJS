const path = require('path')

let rootPath = path.normalize(__dirname, '/../../')
let port = process.env.PORT || 1337

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://localhost:27017/messanger',
    port: port,
    sessionSecret: 'super-secret!@#$%',
    staticsFolder: 'public'
  },
  production: {}
}
