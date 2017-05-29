const homeHandler = require('./home')
const productsHandler = require('./products')
const staticFilesHandler = require('./static-files')
const imageHandler = require('./images')
const galleryHandler = require('./gallery')
const statusHandler = require('./status.js')

module.exports = [
  statusHandler,
  homeHandler,
  productsHandler,
  staticFilesHandler,
  imageHandler,
  galleryHandler]
