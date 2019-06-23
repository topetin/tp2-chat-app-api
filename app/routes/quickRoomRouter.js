const express = require('express')
const quickRoom = require('../controllers/quickRoomController.js')
const bodyParser = require('body-parser'),

router = module.exports = new express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

router.post('/createQuickRoom', quickRoom.createRoom)
router.post('/joinQuickRoom', quickRoom.joinRoom)
router.get('/getRoomByToken', quickRoom.getRoomByToken)

module.exports = router