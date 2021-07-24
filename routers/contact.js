const http = require('http');
const express = require('express')
const Contact = require('../models/Contact')
const router = express.Router()

router.post('/contact', async (req, res,) => {
    const contact = new Contact ({
        name: req.body.name,
        phone: parseInt(req.body.phone),
        email: req.body.email
        // owner: req.user.email
    })
    try {
        await contact.save()
        res.status(201).send(contact)
    } catch (e) {
        console.log('Given Data is not correct')
        res.status(400).send(e)
    }
})

router.get('/contact', async (req, res,) => {
    try {
        const contact = await Contact.find({ owner: req.user.email })
        res.send(contact)
    } catch (e) {
        console.log('Contact Not Found')
        res.status(500).send(e)
    }
})

router.get('/contact/:id', async (req, res,) => {
    try {
        const contact = await Contact.findOne({ _id, owner: req.user.email })

        if (!contact) {
            return res.status(404).send()
        } else
        res.send(contact)
    }catch(e) {
    res.status(500).send(e)
    }
})

module.exports = router