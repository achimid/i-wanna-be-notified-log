const mongoose = require('mongoose')

const schema = mongoose.Schema({    
    uuid: { type: String, index: true }, 
    executionTime: { type: String }, 
    level: { type: String },
    log: { type: String }, 
    extra: { type: Object },
    createdAt: { type: Date, required: true, default: new Date() }
}, { versionKey: false, timestamps: false })

module.exports = mongoose.model('logs', schema)