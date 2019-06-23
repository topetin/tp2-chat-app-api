const path = require('path')
const quickRoomController = {};
const Chat = require('../models/PublicChat')
const roomValidator = require('../utils/public-room-validator')

const createQuickRoomView = path.join(__dirname, '/../../public/views/createQuickRoom.html')
const quickRoomView = path.join(__dirname, '/../../public/views/quickRoom.html')
const enterQuickRoomView = path.join(__dirname, '/../../public/views/enterQuickRoom.html')

quickRoomController.home = (req, res) => {
    res.status(200).json({status: 200, code: 'OK'})
}

quickRoomController.createRoom = (req, res) => {
    const user = req.body.user
    const room = req.body.room
    if (!user || !room) {
       return res.status(400).send({error: 'missing required parameters'})
    }
    const chat = new Chat(room, user)
    try {
        chat.addChatRoom()
        res.status(200).send(chat)
    } catch(e) {
        res.status(400).send({error: e.message})
    }
}

quickRoomController.getRoom = (req, res) => {
    const roomId = req.query.id
    if (roomId) {
        const room = roomValidator.isValidRoom(roomId)
        if(room) {
            res.status(200).json({room})
        } else {
            res.status(404).json({error: "room not found"})
        }
    } else {
        res.status(400).json({error: "no room"})
    }
}

quickRoomController.enterRoom =(req, res) => {
    const user = req.body.user;
    const room = req.body.room;
    try {
        roomValidator.addUserToRoom(user, room)
        const chatRoom = roomValidator.getRoom(room)
        res.status(200).json(chatRoom)
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

module.exports = quickRoomController