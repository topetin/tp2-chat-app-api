const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
var cors = require('cors');

// const userRouter = require('./app/routes/userRouter')
// const loginRouter = require('./app/routes/loginRouter')
const quickRoomRouter = require('./app/routes/quickRoomRouter.js')
const homeRouter = require('./app/routes/homeRouter.js')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const quickRoomChat = io.of('/quickRoom');

const port = process.env.PORT

app.use(cors({origin: 'http://localhost:4200'}));
app.use(homeRouter)
app.use(quickRoomRouter)

quickRoomChat.on('connect', (socket) => {
    console.log('a user connected');
    socket.on('join', (userRoom) => {
        console.log(userRoom)
        quickRoomChat.to(userRoom.room).emit('new-member', userRoom.user);
        socket.join(userRoom.room)
    })
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
      socket.on('new-message', (message) => {
          quickRoomChat.emit('new-message', message);
      });
  });



server.listen(port, () => {
    console.log('Server is up on port', port)
})