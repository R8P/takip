const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecordSchema = new mongoose.Schema({
    initialTime: { type: String, required:true },
    initialKm: { type: String, required:true },
    from: { type: String, required:true },
    destination: { type: String, required:true },
    arrivalTime: { type: String, required:true },
    arrivalKm: { type: String, required:true },
    date: { type: Date, default: Date.now },
    plateNo: { type: Schema.Types.ObjectId, ref:'vehicles'},
    driver: { type: Schema.Types.ObjectId, ref:'users'},
    city: { type: Schema.Types.ObjectId, ref:'cities'}
})

module.exports = mongoose.model('Record', RecordSchema)

