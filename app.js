const express = require('express')
const db = require('./db/mongoose')
const contactRouter = require('./routers/contact')
const userRouter = require('./routers/user')
const path = require('path')
const http = require('http')
const jwt = require('jsonwebtoken')
const engines = require('consolidate');


const app = express();

const port = process.env.port || 3000
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');


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