const path = require('path')
const fs = require('fs')
const url = require('url')
const qs = require('querystring')
const formidable = require('formidable')
//const db = require('../config/database')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname
  let htmlPath = path.normalize(path.join(__dirname, '../views/images/add.html'))

  if (req.pathname === '/images/add' && req.method === 'GET') {
    fs.readFile(htmlPath, 'utf8', (err, data) => {
      if (err) {
        console.log(err)
        return
      }

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })

      data = data.toString()
        .replace('{url-is-null}', '')
        .replace('{name-is-null}', '')
        .replace('{content}', '')
      res.write(data)
      res.end()
    })
  } else if (req.pathname.startsWith('/images/add') && req.method === 'POST') {
    let form = new formidable.IncomingForm()
    let imgName, imgUrl

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err)
        return
      }

      imgName = fields.name
      imgUrl = fields.url

      if (!imgName || !imgUrl) {
        fs.readFile(htmlPath, 'utf8', (err, data) => {
          if (err) {
            console.log(err)
            return
          }

          res.writeHead(200, {
            'Content-Type': 'text/html'
          })

          data = data.toString()
          if (!imgUrl) {
            data = data.replace('{url-is-null}', '<p class="error-msg">* [URL] should be specified</p>')
          } else {
            data = data.replace('{url-is-null}', '')
          }

          if (!imgName) {
            data = data.replace('{name-is-null}', '<p class="error-msg">* [Name] should be specified</p>')
          } else {
            data = data.replace('{name-is-null}', '')
          }

          res.write(data)
          res.end()
        })
      } else {
        let image = {name: imgName, url: imgUrl}
        db.images.add(image)

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
              <img class="product-image center-align" src="${image.url}"/>
              <h2 class="center-align">${image.name}</h2>
            </div>`

          data = data.toString()
            .replace('{content}', content)
            .replace('{url-is-null}', '')
            .replace('{name-is-null}', '')
          res.write(data)
          res.end()
        })
      }
    })
  } else {
    return true
  }
}
