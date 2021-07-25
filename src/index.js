require('dotenv').config()

const cors = require('cors')
const express = require('express')
const compression = require('compression')

const routes = require('./config/routes')

const { databaseInit } = require('./config/database')
const { initConsumer } = require('./log/log-consumer')
const { errorHandler } = require('./error/error-handler')

const app = express()

app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)
app.disable('x-powered-by')



// Initializations
routes(app)

databaseInit()
initConsumer()

app.listen(process.env.PORT)