const mongoose = require('mongoose')
const Schema = mongoose.Schema
const encryption = require('../utilities/encryption')

let userSchema = new Schema({
  username: { type: String, required: [true, 'Username is required'], unique: true },
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
  salt: String,
  hashedPass: String,
  roles: [String]
})

userSchema.method({
  authenticate: function (password) {
    if (encryption.generateHashedPassword(this.salt, password) === this.hashedPass) {
      return true
    } else {
      return false
    }
  }
})

let User = mongoose.model('User', userSchema)

module.exports = User
module.exports.seedAdminUser = () => {
  User.find({}).then((users) => {
    if (users.length > 0) {
      return
    }

    let salt = encryption.generateSalt()
    let hashedPass = encryption.generateHashedPassword(salt, '123456')
    User.create({
      username: 'joe.black',
      firstName: 'Joe',
      lastName: 'Black',
      salt: salt,
      hashedPass: hashedPass,
      roles: ['Admin']
    })
  })
}
