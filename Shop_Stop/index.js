const http = require('http')
const handlers = require('./handlers')
const port = 3000
const config = require('./config/config')
const database = require('./config/database.config')

let env = process.env.NODE_ENV || 'development'

database(config[env])

http.createServer((req, res) => {
  for (let handler of handlers) {
    if (!handler(req, res)) {
      // Handler was used
      break
    }
  }
}).listen(port)
