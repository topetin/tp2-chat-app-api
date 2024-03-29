const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const cors = require('cors')
const roomsHandler = require('./app/utils/public-room-handler')

const quickRoomRouter = require('./app/routes/quickRoomRouter.js')
const homeRouter = require('./app/routes/homeRouter.js')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const quickRoomChat = io.of('/quickRoom');

const port = process.env.PORT || 3000

app.use(cors({origin: 'https://tp2-chatapp-ui.herokuapp.com'}));
app.use(homeRouter)
app.use(quickRoomRouter)

quickRoomChat.on('connection', (socket) => {

    console.log('a user connected');

    socket.on('join', (joinData) => {
        socket.user = joinData.user
        socket.room = joinData.room
        socket.join(joinData.room)
        io.of('/quickRoom').to(joinData.room).emit('new-member', {room: joinData.room, user: joinData.user})
    })

    socket.on('new-message', (data) => {
        io.of('/quickRoom').to(data.room).emit('new-message', data.message)
    })

    socket.on('typing', (data) => {
        if (data.user === false) {
            socket.to(data.room).emit('typing', false)
        } else {
            socket.to(data.room).emit('typing', data.user)
        }
        
    })

    socket.on('disconnect', function(){
        io.of('/quickRoom').to(socket.room).emit('member-disconnected', socket.user)
        roomsHandler.removeUser(socket.room, socket.user)
        console.log('user disconnected')
    })

  })



server.listen(port, () => {
    console.log('Server is up on port', port)
})