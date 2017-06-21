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
  },
  findUser: (req, res) => {
    let username = req.query.searchName

    User
      .findOne({ username: username })
      .then((user) => {
        if (user) {
          res.render('home/index', {
            messageUser: user.username,
            messageUserId: user._id,
            blocked: req.user.blackList.indexOf(user._id) >= 0
          })
        } else {
          res.locals.globalError = 'User with the given name not found'
          res.render('home/index')
        }
      })
  },
  block: (req, res) => {
    let forUser = req.body.forUser

    User
      .findOne({ username: forUser })
      .then((user) => {
        console.log(user)
        User
          .findById(req.user._id)
          .then((currentUser) => {
            let toBeBlocked = currentUser.blackList.indexOf(user._id) < 0
            if (toBeBlocked) {
              currentUser.blackList.push(user._id)
            } else {
              currentUser.blackList = currentUser.blackList.filter((u) => !user._id.equals(u))
            }

            currentUser
              .save()
              .then(() => {
                res.render('home/index', {
                  messageUser: user.username,
                  messageUserId: user._id,
                  blocked: toBeBlocked
                })
              })
          })
      })
  }
}
