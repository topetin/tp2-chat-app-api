module.exports = function(io) { io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
      socket.on('new-message', (message) => {
          console.log('recibido')
        console.log(message);
      });
  });
}