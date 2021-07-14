module.exports = {
    info: ({ uuid, level, executionTime, log, extra }) => {
        if (extra) console.log(uuid, level, executionTime, log, extra)    

        console.log(uuid, level, executionTime, log)
    }
}