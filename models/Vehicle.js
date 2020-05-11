const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VehicleSchema = new mongoose.Schema({
    cityName: { type: Schema.Types.ObjectId, ref:'cities'},
    plate: { type: String, required:true, unique:true}
 
})

module.exports = mongoose.model('Vehicle', VehicleSchema)