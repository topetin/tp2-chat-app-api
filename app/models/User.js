class User {
    constructor(name, color) {
        this.name = name
        this.color = color
    }

    getName() {
        return this.name
    }

    setName(name) {
        this.name = name;
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }

    getUser() {
        return this
    }
}

module.exports = User