const http = require('http');
const express = require('express')
const Contact = require('../models/Contact')
// const auth = require('../middleware/auth')
const router = express.Router()

router.post('/contact', async (req, res,) => {
    const contact = new Contact ({
        name: req.body.name,
        phone: parseInt(req.body.phone),
        email: req.body.email,
        owner: req.user.email
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
    console.log('their is not any contact of this id')
    res.status(500).send(e)
    }
})

router.patch('/contact/:id', async (req, res,) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'phone', 'email']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Can Not Update!' })
    }
    try {
        const contact = await Contact.findById(req.params.id)
        if(_id == req.params.id) {
            updates.forEach((update) => contact[update] = req.body[update])
            await contact.save()
        }
        else if( _id != req.params.id ) {
            return res.status(400).send(e)
        }
        if(!contact) {
            return res.status(404).send(e)
        }
        res.send(contact)
        }  
        catch(e) {
            res.status(400).send(e)
        }
})

router.delete('/contact/:id/delete', async (req, res,) => {
    try {
        const contact = await Contact.findOneAndDelete({ _id: req.params.id, owner: req.user.email })
    if(!contact) {
        return res.status(404).send()
    }
    res.send(contact)
    }
    catch (e) {
        res.status(500).send()
    }
})

module.exports = router