const express = require('express')
const db = require('./db/mongoose')
const contactRouter = require('./routers/contact')
const userRouter = require('./routers/user')
const path = require('path')
const http = require('http')
const jwt = require('jsonwebtoken')


const app = express();

const port = process.env.port || 3000
// const publicDirectoryPath = path.join(__dirname, + './public')

app.use(express.static(__dirname + '././public'));
// const HTML_DIR = path.join(__dirname, '/public/')
// app.use(express.static(HTML_DIR))

// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname+ '/views/index.html'))
// })

// const publicDirectoryPath = path.join(__dirname)

app.get('/', function (req, res, next) {
      res.sendFile(path.join(__dirname+ '/views/signin.html'))
  // console.log('Successfully User Created!')
})

app.use(express.static(__dirname))

app.use(express.json())
app.use(contactRouter)
app.use(userRouter)

const User = require('./models/user')
const token = jwt.sign({ _id: '61064d41cd5ca61287a7e234' }, 'thisismynewproject');

console.log(token);

jwt.verify(token, 'thisismynewproject', function(err, token) {
    console.log(token)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})

module.exports = app