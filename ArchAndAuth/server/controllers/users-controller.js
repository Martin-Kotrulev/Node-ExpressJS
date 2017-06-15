const encryption = require('../utilities/encryption')
const User = require('../data/User')
const errors = require('../utilities/errors')

module.exports = {
  registerGet: (req, res) => {
    res.render('users/register')
  },
  registerPost: (req, res) => {
    let reqUser = req.body
    let salt = encryption.generateSalt()
    let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)

    let user = new User({
      username: reqUser.username,
      hashedPass: hashedPassword,
      firstName: reqUser.firstName,
      lastName: reqUser.lastName,
      salt: salt
    })

    user.save()
      .then(user => {
        req.login(user, err => {
          if (err) {
            res.locals.globalError = err
            res.render('users/register', reqUser)
          }

          res.locals.username = req.user.username
          res.redirect('/')
        })
      })
      .catch(err => {
        res.locals.globalError = errors.getFirstErrorMessage(err)
        res.render('users/register', { user: reqUser })
      })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  },
  loginGet: (req, res) => {
    res.render('users/login')
  },
  loginPost: (req, res) => {
    let reqUser = req.body

    User.findOne({username: reqUser.username})
      .then(user => {
        if (!user) {
          res.locals.globalError = 'Invalid username or password'
          res.render('users/login')
          return
        }

        if (!user.authenticate(reqUser.password)) {
          res.locals.globalError = 'Invalid username or password'
          res.render('users/login')
          return
        }

        req.logIn(user, err => {
          if (err) {
            res.locals.globalError = err
            res.render('users/login')
          }

          res.redirect('/')
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
