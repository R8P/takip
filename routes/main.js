const express = require('express')
const router = express.Router()
const Record = require('../models/Record')
const User = require('../models/User')
const Vehicle = require('../models/Vehicle')
const City = require('../models/City')
const path = require('path')


router.get('/', (req, res) => {
    Record.find({})
        .populate({ path: 'driver', model: User })
        .populate({ path: 'plateNo', model: Vehicle })
        .populate({ path: 'city', model: City })
        .then(records => {
            Vehicle.aggregate([
                {
                    $lookup: {
                        from: 'records',
                        localField: '_id',
                        foreignField: 'plateNo',
                        as: 'records'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        plate: 1,
                        num_of_posts: { $size: '$records' }
                    }
                }
            ])
            .then(vehicles => {
                res.render('site/index', { records: records, vehicles: vehicles })
            })
        })
})

router.get('/', (req, res) =>{
    Vehicle.find({}).then(vehicles=>{
        res.render('/',{vehicles:vehicles})
    })
})




/* Vehicle.find({
    cityName: '5eafd904afa68420afd7e525'}
    ,(error,vehicles)=>{
        console.log(error,vehicles)
    }) */

module.exports = router