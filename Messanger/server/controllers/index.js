const homeController = require('./home-controller')
const usersController = require('./users-controller')
const adminsController = require('./admins-controller')
const threadController = require('./thread-controller')
const messageController = require('./message-controller')

module.exports = {
  home: homeController,
  users: usersController,
  admins: adminsController,
  thread: threadController,
  message: messageController
}
