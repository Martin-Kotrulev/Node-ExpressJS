const url = require('url')
const fs = require('fs')
const path = require('path')
const qs = require('path')
const db = require('../config/database')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname
  let htmlPath = path.normalize(path.join(__dirname, '../views/images/gallery.html'))

  if (req.pathname === '/images/gallery' && req.method === 'GET') {
    let images = db.images.getAll()
    let content = ''
    for (let img of images) {
      content +=
        `<div class="product-card">
          <img class="product-image" src="${img.url}"/>
          <a href="/images/details/${img.id}">${img.name}</a>
        </div>`
    }

    fs.readFile(htmlPath, 'utf8', (err, data) => {
      if (err) {
        console.log(err)
        return
      }

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })

      data = data.toString().replace('{content}', content || '<h2>No images available</h2>')
      res.write(data)
      res.end()
    })
  } else if (req.pathname.startsWith('/images/details') && req.method === 'GET') {
    let id = req.pathname.substring(req.pathname.lastIndexOf('/') + 1)
    let image = db.images.getById(id)

    if (image) {
      fs.readFile(htmlPath, 'utf8', (err, data) => {
        if (err) {
          console.log(err)
          return
        }

        res.writeHead(200, {
          'Content-Type': 'text/html'
        })

        let content =
          `<div class="center-container">
            <img class="details-img" src="${image.url}"/>
          </div>`
        data = data.toString().replace('{content}', content)

        res.write(data)
        res.end()
      })
    }
  } else {
    return true
  }
}
