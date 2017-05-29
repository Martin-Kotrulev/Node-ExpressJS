const fs = require('fs')
const path = require('path')
const url = require('url')

function getContentType (url) {
  if (url.endsWith('.css')) {
    return 'text/css'
  } else if (url.endsWith('.jpeg')) {
    return 'image/jpeg'
  } else if (url.endsWith('.png')) {
    return 'image/png'
  } else if (url.endsWith('.jpg')) {
    return 'image/jpg'
  }
}

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname.startsWith('/content/') && req.method === 'GET') {
    let filePath = path.normalize(
      path.join(__dirname, `..${req.pathname}`))

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        })

        res.write('Resource not found!')
        res.end()
        return
      }

      res.writeHead(200, {
        'Content-type': getContentType(req.pathname)
      })

      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
