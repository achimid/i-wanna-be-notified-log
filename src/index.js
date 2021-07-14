require('dotenv').config()


const cors = require('cors')
const express = require('express')
const compression = require('compression')


const routes = require('./config/routes')
const { errorHandler } = require('./error/error-handler')

const logConsumer = require('./log/log-consumer')

const app = express()

app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)
app.disable('x-powered-by')



// Initializations
routes(app)

logConsumer.initConsumer()


// const logProducer = require('./log/log-producer')
// setInterval(() => {
//     const t = {
//         uuid: "werwer-werwer-werwer-werwerwer", 
//         level: 0,  
//         executionTime: "122 ms", 
//         log: "Iniciando o teste", 
//         extra: {teste: "ok"}
//     }


//     logProducer.send(t)
    
//     console.log('Enviando log')
// }, 500)


app.listen(process.env.PORT)