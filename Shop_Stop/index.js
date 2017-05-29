const http = require('http')
const handlers = require('./handlers')
const port = 3000

http.createServer((req, res) => {
  for (let handler of handlers) {
    if (!handler(req, res)) {
      // Handler was used
      break
    }
  }
}).listen(port)
