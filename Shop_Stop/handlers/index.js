const homeHandler = require('./home')
const filesHandler = require('./static-files')
const productsHandler = require('./products.js')

module.exports = [homeHandler, filesHandler, productsHandler]
