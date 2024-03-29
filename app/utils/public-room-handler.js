const fs = require('fs')
const roomsPath = './app/data/quick-rooms.json'
const userHandler = require('./user-handler')
const User = require('../models/User')
const Chat = require('../models/PublicChat')

/**
 * public - recibe un PublicChat y la agrega al archivo de salas
 * @param chatRoom 
 */
function addChatRoom(username, roomname) {
    if (isRoomAvailable(roomname)) {
        const user = new User(username, userHandler.getRandomColor())
        const chat = new Chat(roomname, user)
        chat.setToken(generateId().toString())
        const chatRooms = getRooms()
        chatRooms.push(chat)
        fs.writeFileSync(roomsPath, JSON.stringify(chatRooms, null, 4))
        return chat;
    } else {
        throw new Error('Room is taken')
    }
}

/**
 * public - dado un token agrega un usuario a la sala 
 * @param token 
 */
function getRoomByToken(token) {
    const rooms = getRooms()
    const room = rooms.find((r) => r.token === token)
    if (room) {
        return room
    } else {
        throw new Error('Room not found')
    }
}

/**
 * public - agrega un nuevo usuario a la sala
 * @param username
 * @param room 
 */
function joinUserToRoom(username, room) {
    const rooms = getRooms()
    if (rooms.length > 0) {
        const chatRoom = rooms.find((r) => r.room === room)
        if (!userExists(chatRoom, username)) {
            try {
                const user = new User(username, userHandler.getRandomColor())
                chatRoom.users.push(user)
                fs.writeFileSync(roomsPath, JSON.stringify(rooms, null, 4))
            } catch (e) {
                throw new Error('Room not found')
            }
        } else {
            throw new Error('User already exists')
        }
    } else {
        throw new Error('No rooms to join')
    }
}

/**
 * public - devuelve la sala con sus usuarios
 * @param room 
 */
function getRoomInFile(room) {
    let rooms = getRooms()
    let chatRoom = rooms.find((r) => r.room === room)
    return chatRoom
}

/**
 * public - llamado desde app.js para eliminar usuario cuando se desconecta
 * @param room 
 * @param user 
 */
function removeUser(room, user) {
    let rooms = getRooms()
    let index = rooms.findIndex((r) => r.room === room)
    let currentUsers = rooms[index].users.filter((u) => {
        return u.name !== user;
    })
    if (currentUsers.length !== 0) {
        rooms[index].users = currentUsers;
        fs.writeFileSync(roomsPath, JSON.stringify(rooms, null, 4))
    } else {
        removeRoom(room)
    }
}

/**
 * private - devuelve las salas guardadas en el archivo
 */
function getRooms() {
    try {
        return JSON.parse(fs.readFileSync(roomsPath))
    } catch (e) {
        return []
    }
}

/**
 * private - para verificar si la sala existe antes de ser creada
 * @param room 
 */
function isRoomAvailable(room) {
    const rooms = getRooms()
    const roomExists = rooms.find((r) => r.room === room)
    return roomExists ? false : true
}

/**
 * private - genera un token para identificar y compartir enlace a la sala
 */
function generateId() {
    return Math.round(Math.random() * (100000000000000 - 0) + 0)
}

/**
 * private - elimina la sala si no hay mas usuarios conectados
 * @param room 
 */
function removeRoom(room) {
    let rooms = getRooms()
    const index = rooms.findIndex((r) => r.room === room)
    rooms.splice(index, 1)
    fs.writeFileSync(roomsPath, JSON.stringify(rooms, null, 4))
}

/**
 * private - valida si ya existe el nombre de usuario
 * @param room 
 * @param user 
 */
function userExists(room, user) {
    return room.users.find((u) => u.name === user)
}


module.exports = { addChatRoom, getRoomByToken, joinUserToRoom, getRoomInFile, removeUser }