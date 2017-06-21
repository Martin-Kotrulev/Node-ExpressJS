const Message = require('../data/Message')
const User = require('../data/User')
const Thread = require('../data/Thread')

module.exports = {
  startNew: (req, res) => {
    let callerId = req.user._id
    let receiverName = req.body.receiver

    if (req.user.username === receiverName) {
      res.locals.globalError = 'You can\'t start a conversation with yourself'
      res.render('home/index')
    } else {
      User
        .findOne({ username: receiverName })
        .then((receiver) => {
          if (receiver.blackList.indexOf(callerId) >= 0) {
            res.locals.globalError = 'This user has blocked you'
            res.render('home/index')
          } else {
            let thread = new Thread({
              caller: req.user,
              receiver: receiver
            })

            Thread
              .find()
              .and([
                { caller: req.user },
                { receiver: receiver }
              ])
              .then((threads) => {
                if (threads.length > 0) {
                  res.locals.globalError = `There's already started conversetion with user '${receiverName}'`
                  res.render('home/index')
                } else {
                  thread
                    .save()
                    .then((savedThread) => {
                      res.render('threads/thread', { thread: savedThread })
                    })
                }
              })
          }
        })
    }
  },
  getThread: (req, res) => {
    let threadErr = req.session.threadErr
    let oldMessage = req.session.threadMsg
    delete req.session.threadErr

    let userParam = req.params.username

    User
      .findOne({ username: userParam })
      .then((receiver) => {
        Thread
          .findOne({})
          .or([
            { $and: [{ receiver: req.user._id }, { caller: receiver._id }] },
            { $and: [{ receiver: receiver._id }, { caller: req.user._id }] }
          ])
          .populate('messages')
          .then((thread) => {
            thread.messages.sort((a, b) => {
              if (a.added < b.added) return -1
              else if (a.added > b.added) return 1
              return 0
            })

            thread.messages.forEach((m) => {
              if (m.author.equals(req.user._id)) {
                m.fromCaller = true
              } else {
                m.fromCaller = false
                m.isLiked = m.likes.indexOf(req.user._id) >= 0
              }

              m.isLink = (m.message.startsWith('http') || m.message.startsWith('https')) &&
                !(m.message.endsWith('jpeg') || m.message.endsWith('png') || m.message.endsWith('jpg'))
              m.isImg = (m.message.startsWith('http') || m.message.startsWith('https')) &&
                (m.message.endsWith('jpeg') || m.message.endsWith('png') || m.message.endsWith('jpg'))
            })

            res.render('threads/thread', {
              thread: thread,
              threadErr: threadErr,
              oldMessage: oldMessage,
              userParam: userParam,
              blocked: receiver.blackList.indexOf(req.user._id) >= 0,
              currentUser: req.user._id
            })
          })
      })
  }
}
