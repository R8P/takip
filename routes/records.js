const express = require('express')
const router = express.Router()
const Record = require('../models/Record')
const Vehicle = require('../models/Vehicle')
const City = require('../models/City')
const User = require('../models/User')

//Add records
router.get('/new',(req, res) =>{
    if(!req.session.userId){
        res.redirect('users/login')
    }
    //şehir ve plaka select menusu için
    Vehicle.find({}).then(vehicles => {
        City.find({}).then(cities => {
            res.render('site/addRecord',{vehicles:vehicles, cities:cities})
        })
    })
})

router.post('/save', (req, res) => {
    Record.create({
        ...req.body,
        driver: req.session.userId
    })
    res.redirect('/')

})



router.get('/plateNo/:plateNoId',(req,res) =>{
    Record.find({plateNo: req.params.plateNoId})
    .populate({ path: 'plateNo', model: Vehicle })
    .populate({ path: 'driver', model: User })
    .populate({ path: 'city', model: City })
    .then(records =>{
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
        .then(vehicles=>{
            res.render('site/index',{vehicles:vehicles,records:records})
        })
    })
})

module.exports = router

