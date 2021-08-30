const healthcheck = require('./healthcheck')
const log = require('../log/log-controller')
const logStream = require('../log/log-stream-controller')

const prefix = process.env.API_PREFIX + process.env.API_VERSION

module.exports = async (app) => {
    console.info('Registrando rotas...')

    app.use(`${prefix}`, healthcheck)
    app.use(`${prefix}/log`, log)
    app.use(`${prefix}/stream`, logStream)

    return app
}