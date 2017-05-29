const homeHandler = require('./home')
const productsHandler = require('./products')
const staticFilesHandler = require('./static-files')
const imageHandler = require('./images')

module.exports = [homeHandler, productsHandler, staticFilesHandler, imageHandler]
