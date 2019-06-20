const express = require('express')
const quickRoom = require('../controllers/quickRoomController.js')
const bodyParser = require('body-parser'),

router = module.exports = new express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

router.get('/createQuickRoom', quickRoom.home)

router.post('/quickRoom', quickRoom.createRoom)

router.get('/room', quickRoom.getRoom)

router.post('/chatRoom', quickRoom.enterRoom)

module.exports = router