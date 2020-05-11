const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const Vehicle = require('../../models/Vehicle')
const Record = require('../../models/Record')
const City = require('../../models/City')

router.get('/', (req, res) => {
    res.render('admin/index')
})
//CITY
router.get('/city', (req, res) => {
    City.find({}).then(cities => {
        res.render('admin/city', { cities: cities })
    })
})

router.post('/city', (req, res) => {
    City.create(req.body)
    res.redirect('city')
})
//USERS
router.get('/users', (req, res) => {
    User.find({}).populate({ path: 'city', model: City }).then(users => {
            City.find({}).then(cities => {
                res.render('admin/users', { users: users, cities: cities })
            })
        })
})
router.post('/users', (req, res) => {
    User.create(req.body)
    res.redirect('users')
})

//VEHICLES
router.get('/vehicles', (req, res) => {
    Vehicle.find({}).populate({ path: 'cityName', model: City }).then(vehicles => {
        City.find({}).then(cities => {
            res.render('admin/vehicles', { vehicles: vehicles, cities: cities })
        })   
    })
})

router.post('/vehicles', (req, res) => {
    Vehicle.create(req.body)
    res.redirect('vehicles')
})

//RECORDS
router.get('/records', (req, res) => {
    Record.find({})
    .populate({ path: 'driver', model: User })
    .populate({ path: 'plateNo', model: Vehicle })
    .populate({ path: 'city', model: City })
    
    .then(records => {
        res.render('admin/records', { records: records})
    })
})

router.post('/records', (req, res) => {
    Records.create(req.body)
    res.redirect('records')
})

router.get('/vehicles/:vehiclesId', (req, res) => {
    Record.find({vehicles: req.params.vehiclesId})
    .populate({ path: 'plateNo', model: Vehicle })
    .then(records =>{
        res.render('admin/records',{records:records})
    })
})

//DELETE RECORDS
router.delete('/records/:id', (req, res) => {
    Record.remove({ _id: req.params.id }).then(() => {
        res.redirect('/admin/records')
    })
})
//DELETE USER
router.delete('/users/:id', (req, res) => {
    User.remove({ _id: req.params.id }).then(() => {
        res.redirect('/admin/users')
    })
})
//DELETE VEHICLE
router.delete('/vehicles/:id', (req, res) => {
    Vehicle.remove({ _id: req.params.id }).then(() => {
        res.redirect('/admin/vehicles')
    })
})
//DELETE CITY
router.delete('/city/:id', (req, res) => {
    City.remove({ _id: req.params.id }).then(() => {
        res.redirect('/admin/city')
    })
})
module.exports = router