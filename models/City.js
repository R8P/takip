const mongoose = require('mongoose')

const CitySchema = new mongoose.Schema({
    name: { type: String, required:true}
})

module.exports = mongoose.model('City', CitySchema)