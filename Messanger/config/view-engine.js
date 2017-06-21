const hbs = require('express-handlebars')

module.exports = {
  name: 'hbs',
  engine: hbs({defaultLayout: 'main', extname: '.hbs'}),
  extname: '.hbs',
  helpers: {
    if_cond: function (v1, v2, options) {
      if (v1 === v2) {
        return options.fn(this)
      }
      return options.inverse(this)
    }
  }
}
