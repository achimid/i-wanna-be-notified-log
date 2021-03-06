const logger = require('../utils/logger')
const logModel = require('./log-model')
const { clearObj, dateBetween } = require('../utils/commons')
const { getSocket } = require('../utils/socket-util') 

const limit = parseInt(process.env.DEFAULT_ENDPOINT_LIST_LIMIT)

const findByFilter = (filter) => {
    const { startDate, endDate, uuid, type } =  filter
    filter = dateBetween({ uuid }, startDate, endDate)

    return logModel
        .find(clearObj(filter))
        .sort({createdAt: -1})
        .limit(limit)
        .lean()
        .then(formatType(type))
}

const formatType = (type) => type != 'text' ? (logs) => logs : (logs) => logs.map(formatLog)

const formatLog = (l) => `${l.uuid}, [${l.level || 0}], ${l.executionTime || '0ms'}, ${l.log}, ${l.extra ? JSON.stringify(l.extra) : ''}`

const findById = (id) => logModel.findById(id).lean()

const removeByUuid = (uuid) => logModel.deleteMany({ uuid }).lean()

const onMessage = (data) => insert(data).then(emitLog).then(logger.info)

const insert = (data) => logModel.create(data).then(() => data)

const emitLog = (data) => {
    getSocket().emit(`i-wanna-be-notified-event-log`, data)
    return data
}

module.exports = {
    insert,
    findById,
    onMessage,
    removeByUuid,
    findByFilter
}