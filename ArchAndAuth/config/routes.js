const controllers = require('../server/controllers')

module.exports = (app) => {
  // Home controller routes
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}
