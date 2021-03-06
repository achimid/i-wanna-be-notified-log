const router = require('express').Router()
const { OK } = require('http-status-codes')

const service = require('./log-service')
const { validatePathId } = require('../utils/validator')


router.get('/', (req, res) => {
    console.log('Find logs by filter')
    return service.findByFilter(req.query)
        .then(logs => res.status(OK).send({ logs }))
        .catch(res.onError)
})

router.get('/:id', validatePathId, (req, res) => {
    console.log('Find log by id')
    return service.findById(req.params.id)
        .then(log => res.status(OK).send(log))
        .catch(res.onError)
})

router.delete('/uuid/:uuid', (req, res) => {
    console.log('Delete logs by filter')
    return service.removeByUuid(req.params.uuid)
        .then(() => res.status(OK).send())
        .catch(res.onError)
})

router.get('/stream', (req, res) => {
    console.log('Streaming Logs')
    return service.stream(req)
        .catch(res.onError)
})

module.exports = router