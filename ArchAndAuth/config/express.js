const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const viewEngine = require('./view-engine')

module.exports = (app, settings) => {
  app.engine(viewEngine.name, viewEngine.engine)
  app.set('view engine', viewEngine.name)

  // Setting middleware
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(session({ secret: settings.sessionSecret, resave: false, saveUninitialized: false }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user
    }
    next()
  })
  app.use(express.static(settings.staticsFolder))

  console.log('Express ready!')
}
