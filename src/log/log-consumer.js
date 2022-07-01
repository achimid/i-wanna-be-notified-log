const { consumeFromQueue } = require("../utils/queue")
const service = require('./log-service')

const initConsumer = () => {
        
    consumeFromQueue("LOG", service.onMessage, 50, true)

}
module.exports = {
    initConsumer
}
