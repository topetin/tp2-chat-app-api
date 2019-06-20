const express = require('express')
const home = require('../controllers/homeController')

const router = new express.Router()

router.get('', home.goHome)

module.exports = router