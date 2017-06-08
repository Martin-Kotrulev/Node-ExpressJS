const express = require('express')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

let app = express()

app.get('/', (req, res) => {
  console.log('Express working...')

  mongoose.connect('mongodb://localhost:27017/blogsystem')
    .then(() => {
      console.log('Mongoose ready...')
      res.send('OK!')
    })
})

app.listen(1337)
