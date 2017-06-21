const User = require('../data/User')

module.exports = {
  all: (req, res) => {
    User
      .find({})
      .then((users) => {
        users.forEach((u) => {
          u.isAdmin = u.roles.indexOf('Admin') >= 0
        })
        res.render('admins/admins', { users: users })
      })
  },
  add: (req, res) => {
    let userId = req.body.userId

    User
      .findById(userId)
      .then((user) => {
        user.roles.push('Admin')

        user
          .save()
          .then(res.redirect(req.get('referer')))
      })
  },
  remove: (req, res) => {
    let userId = req.body.userId

    User
      .findById(userId)
      .then((user) => {
        user.roles = user.roles.filter((r) => r !== 'Admin')

        user
          .save()
          .then(res.redirect(req.get('referer')))
      })
  }
}
