const passport = require('passport')
const PassportLocal = require('passport-local')
const User = require('mongoose').model('User')

module.exports = () => {
  passport.use(new PassportLocal((username, password, done) => {
    User.findOne({username: username}).then(user => {
      if (!user) return done(null, false)
      if (!user.authenticate(passport)) return done(null, false)
      return done(null, user)
    })
  }))

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      if (!user) return done(null, false)
      return done(null, user)
    })
  })
}
