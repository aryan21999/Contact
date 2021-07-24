const http = require('http')
const express = require('express')
const User = require('../models/User')
const router = new express.Router()

router.post('/users', async (req, res,) => {
    const user = new User ({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    })
    try {
      await user.save()
      res.status(201).send(user)
    }
    catch (e) {
      console.log('Enter Data is not Correct')
      res.status(400).send(e)
  }
})

module.exports = router