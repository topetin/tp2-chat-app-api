const fs = require('fs')
const roomsPath = './app/data/rooms.json'

function getRooms() {
    try {
        return JSON.parse(fs.readFileSync(roomsPath))
    } catch(e) {
        return []
    }
}

function isValidRoom(token) {
    tokenString = token.toString()
    const rooms = getRooms()
    const roomExists = rooms.find((r) => r.token === tokenString)
    return roomExists
}

function addUserToRoom(user, room) {
    const rooms = getRooms()
    try {
        rooms.find((r) => r.room === room).users.push(user)
        fs.writeFileSync(roomsPath, JSON.stringify(rooms))
    } catch (e) {
        throw new Error('Room not found')
    }
}

function getRoom(room) {
    const rooms = getRooms()
    const chatRoom = rooms.find((r) => r.room === room)
    return chatRoom
}

function removeUser(room, user) {
    const rooms = getRooms()
    const chatRoom =rooms.find((r) => r.room === room)
    
    .users.splice()

    const chatRoom = getRoom(room)
    if (chatRoom) {
        console.log(chatRoom)
    }
}

module.exports = {getRooms, isValidRoom, addUserToRoom, getRoom, removeUser}