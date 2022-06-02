const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.use(express.urlencoded({ extended: false }))

mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

const Item = require('./models/Item')

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: err.message }))
})

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  })

  newItem.save().then(item => res.redirect('/'))
})

const port = 3000

app.listen(port, () => console.log('Server running...'))
