const quickRoomController = {};
const roomsHandler = require('../utils/public-room-handler')

quickRoomController.createRoom = (req, res) => {
    const user = req.body.user
    const room = req.body.room
    if (!user || !room) {
       return res.status(400).send({error: 'missing required parameters'})
    }
    try {
        const chat = roomsHandler.addChatRoom(user, room)
        res.status(200).send(chat)
    } catch(e) {
        res.status(400).send({error: e.message})
    }
}

quickRoomController.joinRoom =(req, res) => {
    const user = req.body.user;
    const room = req.body.room;
    if (!user || !room) {
        return res.status(400).send({error: 'missing required parameters'})
     }
    try {
        roomsHandler.joinUserToRoom(user, room)
        const chatRoom = roomsHandler.getRoomInFile(room)
        res.status(200).json(chatRoom)
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

quickRoomController.getRoomByToken = (req, res) => {
    const token = req.query.token
    if (!token) {
        return res.status(400).send({error: 'missing required parameters'})
    }
    try {
        const chatRoom = roomsHandler.getRoomByToken(token)
        res.status(200).json(chatRoom)
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

module.exports = quickRoomController