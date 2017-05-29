const path = require('path')
const url = require('url')
const fs = require('fs')

const getContentType = (url) => {
  if (url.endsWith('.html')) {
    return 'text/html'
  } else if (url.endsWith('.css')) {
    return 'text/css'
  } else if (url.endsWith('js')) {
    return 'application/javascript'
  } else if (url.endsWith('.ico')) {
    return 'image/x-icon'
  } else if (url.endsWith('.jpg')) {
    return 'image/jpg'
  }

  return false // File not found
}

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname.startsWith('/content/') && req.method === 'GET') {
    if (!getContentType(req.pathname)) {
      res.writeHead(403, {
        'Content-Type': 'text/plain'
      })
      res.write('404 Not supported file access')
      res.end()
      return true
    }

    res.writeHead(200, {
      'Content-Type': getContentType(req.pathname)
    })

    let filePath = path.normalize(path.join(__dirname, `..${req.pathname}`))
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        })
        res.write('404 File not found')
        res.end()
        return
      }

      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
