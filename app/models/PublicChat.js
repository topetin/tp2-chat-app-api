class PublicChat {
    constructor(room, user, userColor) {
        this.room = room
        this.users = []
        this.users.push({userName: user, userColor: userColor})
        this.token = null
        this.messages = []
    }

    getRoom() {
        return this.room
    }

    setRoom(room) {
        this.room = room
    }

    getUsers() {
        return this.users
    }

    setUsers(user) {
        this.users = user
    }

    getToken() {
        return this.token
    }

    setToken(token) {
        this.token = token
    }

    getPublicChat() {
        return this
    }

    getMessages() {
        return this.messages
    }
}

module.exports = PublicChat
