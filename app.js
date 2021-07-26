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

// app.use(express.static(__dirname + './../public'));
const HTML_DIR = path.join(__dirname, '/public/')
app.use(express.static(HTML_DIR))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname+ '/views/signup.html'))
})

// const publicDirectoryPath = path.join(__dirname)

// app.get('/', function (req, res, next) {
//   res.sendFile(publicDirectoryPath + './views/signup.html')
//   // console.log('Successfully User Created!')
// })

// app.use(express.static(publicDirectoryPath))


app.use(express.json())
app.use(contactRouter)
app.use(userRouter)


const User = require('./models/User')
const token = jwt.sign({ _id:  '60fcef2136bac012117d1aee' }, 'somesupersecretsecret');

jwt.verify(token, 'somesupersecretsecret', function(err, token) {
    console.log(token)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})

module.exports = app