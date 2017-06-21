const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const MessageSchema = new Schema({
  message: { type: String, required: [true, 'Message is required'] },
  added: { type: Date, default: Date.now },
  author: { type: ObjectId, ref: 'User' },
  thread: { type: ObjectId, ref: 'Thread' },
  likes: {
    type: [ObjectId],
    ref: 'User'
  },
  unseenLike: { type: Boolean, default: false }
})

let MessageModel = mongoose.model('Message', MessageSchema)

module.exports = MessageModel
