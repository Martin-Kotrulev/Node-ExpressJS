const Message = require('../data/Message')
const Thread = require('../data/Thread')

module.exports = {
  add: (req, res) => {
    let threadId = req.body.threadId
    let message = req.body.message
    let userParam = req.body.userParam

    if (message.length > 1000) {
      req.session.threadErr = 'Message must be shorter than 1000 symbols'
      req.session.threadMsg = message

      res.redirect(`/thread/${userParam}`)
    } else {
      Thread
        .findById(threadId)
        .then((thread) => {
          let newMessage = new Message({
            message: message,
            author: req.user,
            thread: thread
          })

          thread.messages.push(newMessage)
          Promise.all([thread.save(), newMessage.save()])
            .then(res.redirect(`/thread/${userParam}`))
        })
    }
  },
  like: (req, res) => {
    Message
      .findById(req.params.id)
      .then((message) => {
        if (message.likes.indexOf(req.user._id) < 0) {
          message.likes.push(req.user._id)
          message.unseenLike = true
        } else {
          message.likes = message.likes.filter((l) => !l.equals(req.user._id))
        }

        message
          .save()
          .then(res.redirect(req.get('referer')))
      })
  }
}
