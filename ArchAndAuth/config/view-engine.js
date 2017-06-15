const hbs = require('express-handlebars')

module.exports = {
  name: 'hbs',
  engine: hbs({defaultLayout: 'main', extname: '.hbs'}),
  extname: '.hbs'
}
