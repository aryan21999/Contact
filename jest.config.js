const dotenv = require('dotenv')
dotenv.config()

process.env = Object.assign(process.env, {
    DB_CONNECT: "mongodb+srv://Aryan:09876Arya@cluster0.h0l2c.mongodb.net/Contact"
});

module.exports = process.env