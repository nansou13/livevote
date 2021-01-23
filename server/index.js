var app = require('express')();
var http = require('http').createServer(app);
const origin = process.env.origin || "http://localhost:3000";//"http://192.168.1.66:3000";
var io = require('socket.io')(http, {
    cors: {
    //   origin: "http://localhost:3000", "http://192.168.1.66:3000"
      origin: origin,
      methods: ["GET", "POST"],
      credentials: true,
    }
  });
let values = []
let results = []
let players = []
let theme = 'No question...'
const ROOM = 'livevote'

io.on('connection', (socket) => {
    
    console.log('a user connected : ', socket.id, socket.address, socket.headers);
    players.push({id: socket.id, pts: 0})
    socket.join(ROOM);
    io.emit('userList', {players});
    console.log('userList : ', players)
    if(theme && values){
      io.to(socket.id).emit('getTheme', {theme, values, results});
      console.log('getTheme', {theme, values, results});
    }


    socket.on('disconnect', () => {
        currentPlayer = players.find((user) => user.id == socket.id)
        players = players.filter((user) => user.id != socket.id) || []
        console.log('user disconnected '+socket.id, players);
        // results = results.filter((user) => user.id != socket.id) || []
        // io.to(ROOM).emit('refreshStats', results);
        io.to(ROOM).emit('userList', {players});
    });

    socket.on('addNewGame', (newvalues) => {
      theme=newvalues.theme
      values = newvalues.values
      results = []
      console.log('runVote', theme, values)
      io.emit('RunVote', {theme, values});
    })

    socket.on('vote', (elm) => {
      //check si blacklisted
      isBlacklisted = results.find((user) => user.id == socket.id)
      console.log('blacklisted', isBlacklisted)
      if(!isBlacklisted){
        results.push({id : socket.id, choice: elm})
        console.log('voted', {id : socket.id, choice: elm}, results)
      }
      io.to(ROOM).emit('refreshStats', results);
    })

  });



const port = process.env.PORT || 4000
http.listen(port, () => {
  console.log('listening on *:'+port);
})
