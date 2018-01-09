const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const contacts = require('./contacts')
const fs = require('fs')

const app = express()

var proxy = require('express-http-proxy');
app.use('/sapodata', proxy('http://eccdev.qilu-pharma.com:8000'))

app.use('/', express.static('F:'))
app.use('/demo', express.static(`${__dirname}/demo_approv`))
app.use(cors())

/*
app.get('/', (req, res) => {
  const help = `
  <pre>
    Welcome to the Address Book API!

    Use an Authorization header to work with your own data:

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

    The following endpoints are available:

    GET /contacts
    DELETE /contacts/:id
    POST /contacts { name, email, avatarURL }
  </pre>
  `
  console.log('///')
  res.send(help)
})
*/

//app.use((req, res, next) => {
//  const token = req.get('Authorization')
//
//  if (token) {
//    req.token = token
//    next()
//  } else {
//    res.status(403).send({
//      error: 'Please provide an Authorization header to identify yourself (can be whatever you want)'
//    })
//  }
//})

/*
app.get('/demo', (req, res) => {
    res.sendFile(`${__dirname}/demo_approv/index.html`);
})
*/

//app.get('/contacts', (req, res) => {
//  res.send(contacts.get(req.token))
//})

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})
