const express = require('express')
const morgan = require('morgan')
const path = require('path')
const handlebars = require('express-handlebars')
const MenthodOverride = require('method-override')
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

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})