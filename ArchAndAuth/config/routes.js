const controllers = require('../server/controllers')
const auth = require('./auth')

module.exports = (app) => {
  // Home controller routes
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  // User controller
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/logout', controllers.users.logout)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}
