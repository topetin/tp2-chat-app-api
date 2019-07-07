class PublicChat {
    constructor(room, user) {
        this.room = room
        this.users = []
        this.users.push(user)
        this.token = null
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
}

module.exports = PublicChat
