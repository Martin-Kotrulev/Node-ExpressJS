// get path name
// check if path is valid for home and is GET
// get file path to the response html
// get the query string
// get the products
// filter against query

const path = require('path')
const url = require('url')
const fs = require('fs')
const qs = require('querystring')
const Product = require('../models/Product')

//const db = require('../config/database')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/' && req.method === 'GET') {
    let filePath = path.normalize(path.join(__dirname, '../views/home/index.html'))

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        })
        res.write('404 FILE NOT FOUND')
        res.end()
        return
      }

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })

      let query = qs.parse(url.parse(req.url).query).query
      let products
      if (query) {
        Product.find({}, (err, allProducts) => {
          if (err) {
            console.log(err)
            return
          }
          products = allProducts
        })
      } else {
        products = Product.find({}, (err, allProducts) => {
          
        })
      }

      let content = ''
      if (products.length === 0 && query) {
        content = `No results found for query "${query}"`
      } else if (products.length === 0 && !query) {
        content = 'No products available'
      } else {
        for (let p of products) {
          content +=
            `<div class="product-card">
              <img class="product-image" src="${p.image}">
              <h2>${p.name}</h2>
              <p>${p.description}</p>
            </div>`
        }
      }

      data = data.toString().replace('{content}', content)

      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
