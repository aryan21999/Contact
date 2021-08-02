const request = require('supertest')
const app = require('../app')
const User = require('../models/user')
const Contact = require('../models/contact')
const db = require('../db/mongoose')

const userOne = {
    name: "Aryan",
    email: "test@test.com",
    password: "12121212"
}
beforeAll(async () => {
    await User.deleteMany()
})

var token, user

test('SignUp a new user', async () => {
    await request(app).post('/users').send({
        name: userOne.name,
        email: userOne.email,
        password: userOne.password
    })
    .expect((res) => {(res.body.user)})
    .expect(201)
})

test('login user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    })
    .expect(200)
    .expect((res) => {token = res.body.token, user = res.body.user})
})