const express = require('express');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const app = express()
const PORT = process.env.PORT || 3000
const CONNECTION_URI =  process.env.MONGODB_URI || 'mongodb://user:te7eyp9cc@ds159020.mlab.com:59020/heroku_53xh30bc'
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const methodOverride = require('method-override')
const path = require('path')
//const generateDate = require('./helpers/generateDate').generateDate


//DATABASE
mongoose.Promise = global.Promise
mongoose.connect(CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const mongoStore = connectMongo(expressSession)

app.use(expressSession({
  secret: 'testotesto',
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));



//HANDLEBARS
app.engine("handlebars",expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  }))
app.set("view engine", "handlebars")


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//Display Link Middleware
app.use((req, res, next) => {
  const { userId } = req.session
  if (userId) {
    res.locals = {
      displayLink: true
    }
  }else {
    res.locals = {
      displayLink: false
    }
  }
  next()
})

const main = require('./routes/main')
const records = require('./routes/records')
const users = require('./routes/users')
const admin = require('./routes/admin/index')
app.use('/', main)
app.use('/records', records)
app.use('/users', users)
app.use('/admin', admin)


app.listen(PORT,() => {
  console.log(`Server çalışıyor, http://:${PORT}/`)
})