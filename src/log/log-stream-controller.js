const router = require('express').Router()
const service = require('./log-service')

router.get('/', (req, res) => {
    console.log('Streaming Logs')
    return service.stream(req)
})

module.exports = router