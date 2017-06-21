module.exports = {
  getFirstErrorMessage: (err) => {
    if (err.name === 'MongoError' && err.code === 11000) {
      return 'There\'s already an existing user with the given credentials!'
    } else {
      let errKeys = Object.keys(err.errors)
      return err.errors[errKeys[0]].message
    }
  }
}
