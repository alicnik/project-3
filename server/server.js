const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Router = require('./router')
const { port, dbURI } = require('./config/environment')

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, (err) => {
  err ? console.log(err) : console.log('Mongoose connected')
})

const expressServer = express()

expressServer.use((req, res, next) => {
  console.log(`Incoming ${req.method} to ${req.url}`)
  next()
})

expressServer.use(bodyParser.json())

expressServer.use('/api/', Router)

expressServer.listen(port, () => console.log(`Running on port ${port}`))

module.exports = expressServer