const Thread = require('../data/Thread')
const Messages = require('../data/Message')

module.exports = {
  index: (req, res) => {
    if (req.user) {
      Thread
        .find()
        .or([
          { caller: req.user._id },
          { receiver: req.user._id }
        ])
        .populate('receiver')
        .populate('caller')
        .sort({ added: -1 })
        .then((threads) => {
          threads.forEach((t) => {
            t.other = t.caller._id.equals(req.user._id) ? t.receiver.username : t.caller.username
          })

          Messages
            .find({ author: req.user._id, unseenLike: true })
            .then((messages) => {
              res.render('home/index', { threads: threads, unseenLikes: messages })
            })
        })
    } else {
      res.render('home/index')
    }
  },
  about: (req, res) => {
    res.render('home/about')
  }
}
