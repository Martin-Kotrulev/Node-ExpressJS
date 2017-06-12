const app = require('express')()
const env = process.env.NODE_ENV || 'development'
const settings = require('./config/settings')[env]

require('./config/database')(settings)
require('./config/express')(app)
require('./config/routes')(app)

app.listen(settings.port)
