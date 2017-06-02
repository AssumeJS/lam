var express = require('express')
var mongoose = require('mongoose')
var path = require('path')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var flash = require('connect-flash')
var passport = require('passport')

var routes = require('./routes')

var setUpPassport = require('./setuppassport')

var app = express()

mongoose.connect('mongodb://assume:assumemyname@ds161021.mlab.com:61021/blog')
setUpPassport()

app.set('port', process.env.PORT || 3000)

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended : false}))
app.use(cookieParser())
app.use(session({
	secret : "TksdbfjbsdfjbsdjbuyfhsdfjLOPPP",
	resave : true,
	saveUninitialized : true
}))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())


app.use(routes)
app.listen(app.get('port'), ()=>{console.log('Listening to port' +app.get('port'))})