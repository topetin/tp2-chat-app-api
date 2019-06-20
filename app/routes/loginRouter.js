const express = require('express')

const router = new express.Router()

router.get('/login', (req, res) => {
    res.sendFile(viewsPath + '/login.html')
})

module.exports = {
    router
}