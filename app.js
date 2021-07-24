const express = require('express')
const db = require('./db/mongoose')
const contactRouter = require('./routers/contact')
const path = require('path')
const http = require('http')

const app = express();

const port = process.env.port || 3000
const publicDirectoryPath = path.join(__dirname, '/views')

app.use(express.json())
app.use(contactRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})

module.exports = app