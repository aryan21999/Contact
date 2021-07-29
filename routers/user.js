const http = require('http')
const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/users', async (req, res,) => {
    const user = new User (req.body)
    try {
      await user.save()
      res.status(201).send(user)
    }
    catch (e) {
      console.log(req.body.name)
      console.log(req.body.email)
      console.log(req.body.password)
      console.log('Enter Data is not Correct')
      res.status(400).send(e)
  }
})


router.post('/users/login', async (req, res,) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } 
  catch (error) {
    res.status(400).send({ error: 'User is not valid' })
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
      req.user.tokens = req.user.tokens.filter((token) => {
          return token.token !== req.token
      })
      await req.user.save()
      res.send()
  } catch (e) {
      res.status(500).send()
  }
})


router.get('/users/me', auth, async (req, res,) => {
  res.send(req.user)
})


router.patch('/users/me', auth, async (req, res) => {
  const update = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if(!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates'})
  }
  try {
    updates.forEach((update) => req.user[update] = req.body[update])
      await req.user.save()
      res.send(req.user)
    }
    catch (e) {
      res.status(400).send(e)
    }
})


module.exports = router