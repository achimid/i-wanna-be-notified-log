require('dotenv').config()


const cors = require('cors')
const express = require('express')
const compression = require('compression')


const routes = require('./config/routes')
const { errorHandler } = require('./error/error-handler')

const app = express()

app.use(cors())
app.use(compression())
app.use(express.bodyParser())
app.use(errorHandler)
app.disable('x-powered-by')

// Initializations
routes(app)

app.listen(process.env.PORT)