const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ThreadSchema = new Schema({
  caller: { type: ObjectId, ref: 'User' },
  receiver: { type: ObjectId, ref: 'User' },
  messages: [ { type: ObjectId, ref: 'Message' } ],
  added: { type: Date, default: Date.now }
})

let ThreadModel = mongoose.model('Thread', ThreadSchema)

module.exports = ThreadModel
