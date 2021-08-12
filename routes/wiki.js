const express = require('express')
const router = express.Router()
const { Page, User } = require('../models')
const addPage = require('../views/addPage')
const wikiPage = require('../views/wikipage')

router.get('/', async (req, res, next) => {
  try {
    res.send(await Page.findAll())
  } catch (error) {
    next(error)
  }
})
router.get('/add', (req, res) => {
  res.send(addPage())
})

router.post('/', async (req, res, next) => {
  try {
    const user =  await User.create({
      name: req.body.name,
      email: req.body.email
    })

    const page = await Page.create({
      title: req.body.title,
      slug: Page.isSafe(req.body.title),
      content: req.body.content,
      status: req.body.status
    })

    res.redirect('/')
  } catch (error) {
    next(error)
  }
})

module.exports = router
