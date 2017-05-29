const fs = require('fs')
const path = require('path')
const dbPath = path.join(__dirname, '/database.json')
const defDb = '{products: [], images: []}'

let dbInit = () => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, defDb)

    return {products: [], images: []}
  }

  let json = fs.readFileSync(dbPath).toString() || defDb
  let db = JSON.parse(json)

  return db
}

let dbSave = () => {
  let json = JSON.stringify(db)
  fs.writeFileSync(dbPath, json)
}

let db = dbInit()

let getProducts = () => {
  return db.products
}

let getImages = () => {
  return db.images
}

module.exports.products = {}

module.exports.images = {}

module.exports.products.getAll = getProducts

module.exports.products.add = (product) => {
  product.id = db.products.length + 1
  db.products.push(product)

  dbSave()
}

module.exports.products.findByName = (name) => {
  return getProducts().filter((p) => p.name.toLowerCase().includes(name))
}

module.exports.images.add = (image) => {
  image.id = db.images.length + 1
  db.images.push(image)

  dbSave()
}

module.exports.images.getAll = getImages

module.exports.images.findById = (id) => {
  return getImages().filter((i) => i.id === id)
}
