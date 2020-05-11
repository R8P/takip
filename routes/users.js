const express = require('express')
const router = express.Router()
const User = require('../models/User')
const City = require('../models/City')



/* router.get('/register',(req,res) =>{
    User.find({}).then(users => {
        res.render('site/register',{users:users})
    })
})

router.post('/register', (req, res) => {
    User.create(req.body)
    res.redirect('/users/register')
}) */


//LOGIN
router.get('/login',(req, res)=> {
    res.render('site/login')
})
router.post('/login',(req, res)=> {
    const {email, password} = req.body

    User.findOne({email}, (error, user) => {
        if (user) {
            if(user.password == password) {
                //USER SESSION
                req.session.userId = user._id
                console.log(req.body)
                res.redirect('/')
                
            } else {
                res.redirect('/users/login')//password error
            }
            } else {
                res.redirect('/users/login')//user not found
            }
    }) 
})

//LOGOUT
router.get('/logout',(req, res)=> {
    req.session.destroy(()=>{
    res.redirect('/users/login') 
    })
})

module.exports = router