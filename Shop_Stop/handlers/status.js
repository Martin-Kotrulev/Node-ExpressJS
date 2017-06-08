const fs = require('fs')
const path = require('path')
//const db = require('../config/database')

module.exports = (req, res) => {
  let header = req.headers['statusheader']
  let htmlPath = path.normalize(path.join(__dirname, '../views/images/status.html'))

  if (header) {
    fs.readFile(htmlPath, 'utf8', (err, data) => {
      if (err) {
        console.log(err)
        return
      }

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })

      data = data.toString().replace('{content}', `<h2>Total images: ${db.images.getSize()}</h2>`)
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
