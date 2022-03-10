require('dotenv').config()

const cors = require('cors')
const express = require('express')
const compression = require('compression')

const routes = require('./config/routes')

const { databaseInit } = require('./config/database')
const { initConsumer } = require('./log/log-consumer')
const { errorHandler } = require('./error/error-handler')
const { socketInit } = require('./utils/socket-util') 

const app = express()

app.use(cors({origin: '*.*'}))
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)
app.disable('x-powered-by')



// Initializations
routes(app)

databaseInit()
initConsumer()

const server = socketInit(app)
server.listen(process.env.PORT)