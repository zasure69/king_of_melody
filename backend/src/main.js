const express = require('express')
const morgan = require('morgan')
const path = require('path')
const handlebars = require('express-handlebars')
const MenthodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const MongoDBSession = require('connect-mongodb-session')(session)
const app = express()
const port = 3000

const route = require('./routes');
const db = require('./config/db');

//Connect DB
db.connect();

app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());

//passport config
require('./config/passport')(passport);

//static files
app.use(express.static(path.join(__dirname)))

//HTTP logger
app.use(morgan('combined'))

app.use(MenthodOverride('_method'))

//Template engine
app.engine('hbs', handlebars.engine({
  extname: 'hbs',
  helpers: {
    sum: (a, b) => a + b,
  }
}))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))



//session
const store = new MongoDBSession({
  uri: 'mongodb+srv://zasureh69:HD8d2ZNETWZlpXl0@cluster0.eglftpe.mongodb.net/king_of_melody',
  collection: 'sessions'
})

app.use(session({
  secret: 'Key that wil sign cookie',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 *24 * 3 // 3 days
  },
  store: store
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})