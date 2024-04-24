const express = require('express')
const morgan = require('morgan')
const path = require('path')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

//static files
app.use(express.static(path.join(__dirname)))

//HTTP logger
app.use(morgan('combined'))

//Template engine
app.engine('hbs', handlebars.engine({
  extname: 'hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))


app.get('/setting', (req, res) => {
  res.render('setting');
});

app.get('/', (req, res) => {
  res.render('home');
})

app.post('/', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})