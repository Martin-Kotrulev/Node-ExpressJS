let products = []
let count = 1

module.exports.products = products

module.exports.products.getAll = () => {
  return products
}

module.exports.products.add = (product) => {
  product.id = count++
  products.push(product)
}

module.exports.products.findByName = (name) => {
  let product = null
  for (let p of products) {

  }

  return product
}