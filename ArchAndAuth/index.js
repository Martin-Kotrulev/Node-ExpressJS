const express = require('express')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')

mongoose.Promise = global.Promise

let env = process.env.NODE_ENV || 'development'

let port = process.env.PORT || 1337

let app = express()

app.engine('handlebars', handlebars({
  defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  console.log('Express working...')

  mongoose.connect('mongodb://localhost:27017/blogsystem')
    .then(() => {
      console.log('Mongoose ready...')
      res.render('index')
    })
})

app.listen(1337)
