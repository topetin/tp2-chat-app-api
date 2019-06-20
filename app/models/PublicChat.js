const fs = require('fs')

const roomsPath = './app/data/rooms.json'

class PublicChat {
    constructor(room, user) {
        this.room = room
        this.users = []
        this.token = null
        this.addUser(user)
    }

    addChatRoom() {
        if (this.isRoomAvailable(this.room)) {
            this.token = this.generateId().toString()
            const chatRooms = this.getRooms()
            chatRooms.push(this)
            fs.writeFile(roomsPath, JSON.stringify(chatRooms), (err, result) => {
                if (err) console.log('error', err)
            })
        } else {
            throw new Error('Room is taken')
        }
    }

    addUser(user) {
        this.users.push(user)
    }

    getRooms() {
        try {
            return JSON.parse(fs.readFileSync(roomsPath))
        } catch(e) {
            return []
        }
    }

    isRoomAvailable(room) {
        const rooms = this.getRooms()
        const roomExists = rooms.find((r) => r.room === room)
        return roomExists ? false : true
    }

    generateId() {
        return Math.round(Math.random() * (100000000000000- 0) + 0)
    }

    // joinUser() {
    //     const rooms = this.getRooms()
    //     const room = rooms.find
    // }

}

module.exports = PublicChat
