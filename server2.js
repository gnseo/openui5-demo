const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const contacts = require('./contacts')
const fs = require('fs')

const app = express()

app.use(express.static('D:'))
app.use(cors())

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
  console.log('/')
  res.send(help)
})
app.get('/demo', (req, res) => {
  fs.readFile('demo_approv\index.html', function(error, data){
    if(error){
      console.log(error)
    }else{
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end(data)
    }
  })
})

app.get('/sdk', (req, res) => {
  fs.readFile('D:\index.html', function(error, data){
    if(error){
      console.log(error)
    }else{
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end(data)
    }
  })
})

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

app.get('/contacts', (req, res) => {
  res.send(contacts.get(req.token))
})

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})
