const app = require('express')()
const env = process.env.NODE_ENV || 'development'
const settings = require('./config/settings')[env]

require('./config/database')(settings)
require('./config/express')(app, settings)
require('./config/routes')(app)
require('./config/passport')()

app.listen(settings.port)
