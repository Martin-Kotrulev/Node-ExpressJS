const encryption = require('../utilities/encryption')
const User = require('../data/User')

module.exports = {
  registerGet: (req, res) => {
    res.render('users/register')
  },
  registerPost: (req, res) => {
    let reqUser = req.body

    console.log(reqUser)

    // Add user validation
    let salt = encryption.generateSalt()
    let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)

    User.create({
      username: reqUser.firstName,
      hashedPass: hashedPassword,
      firstName: reqUser.firstName,
      lastName: reqUser.lastName,
      salt: salt
    }).then(user => {
      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalError = err
          res.render('users/register', user)
        }

        res.redirect('/')
      })
    }).catch(err => {
      console.log(err)
      res.locals.globalError = err // `There's already registered user with the name "${reqUser.username}"!`
      res.render('users/register')
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

  }
}
