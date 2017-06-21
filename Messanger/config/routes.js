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
  app.get('/users/find', auth.isAuthenticated, controllers.users.findUser)
  app.post('/users/block', auth.isAuthenticated, controllers.users.block)

  // Admins controller
  app.get('/admins/all', auth.isInRole('Admin'), controllers.admins.all)
  app.post('/admins/add', auth.isInRole('Admin'), controllers.admins.add)
  app.post('/admins/remove', auth.isInRole('Master'), controllers.admins.remove)

  // Thread controller
  app.post('/thread/:username', auth.isAuthenticated, controllers.thread.startNew)
  app.get('/thread/:username', auth.isAuthenticated, controllers.thread.getThread)

  // Message controller
  app.post('/message/add', auth.isAuthenticated, controllers.message.add)
  app.post('/message/:id', auth.isAuthenticated, controllers.message.like)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}
