const request = require('supertest')
const app = require('../app')
const User = require('../models/user')
const Contact = require('../models/contact')
const db = require('../db/mongoose')


const userOne = {
    name: "Aryan12",
    email: "test12@test.com",
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

test('login that user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    })
    .expect(200)
    .expect((res) => {token = res.body.token, user = res.body.user})
})

const contactOne = {
    name: "lucky",
    phone: "1234432156",
    email: "lucky@test.com"
}

const contactTwo = {
    name: "Ayush",
    phone: "0987789065",
    email: "ayush@test.com"
}

var id

test('Create Contact', async () => {
    await request(app).post('/contact')
    .set('Authorization', `Bearer ${token}`)
    .send({
        name: contactOne.name,
        phone: contactOne.phone,
        email: contactOne.email
    })
    .expect((res) => {id = res.body._id})
    .expect(201)
})

test('Update Contact', async () => {
    await request(app).patch(`/contact/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
        name: contactTwo.name,
        phone: contactTwo.phone,
        email: contactTwo.email
    })
    .expect(200)
})

test('Delete Contact', async () => {
    await request(app)
    .delete(`/contact/${id}/delete`)
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200);
})

test('Read all contact', async () => {
    const response = await request(app).get('/contact')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    expect(response.body[0].name).toEqual(contactOne.name)
})