var app = require('express')();
var http = require('http').createServer(app);
const origin = process.env.origin || "http://localhost:3000";
var io = require('socket.io')(http, {
    cors: {
    //   origin: "http://localhost:3000", "http://10.40.44.243:3000"
      origin: origin,
      methods: ["GET", "POST"],
      credentials: true,
    }
  });
let values = []
let results = []
let players = []
let theme = '...'
const ROOM = 'livevote'

io.on('connection', (socket) => {
    
    console.log('a user connected');
    socket.on('disconnect', () => {
        currentPlayer = players.find((user) => user.id == socket.id)
        players = players.filter((user) => user.id != socket.id) || []
        console.log('user disconnected '+socket.id, players);
        io.emit('userList', {players});
        if(currentPlayer)
          io.emit('message', {message : {text : currentPlayer.name+' vient de se deconnecter de la partie'}});
    });

    socket.on('addPlayer', (name) => {
        players.push({name, id: socket.id, pts: 0})
        console.log('salut '+name, players);
        socket.join(ROOM);
        io.emit('userList', {players});
        io.emit('message', {message : {text : name+' vient de rejoindre la partie'}});
    })

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
      io.emit('refreshStats', results);
    })

  });



const port = process.env.PORT || 4000
http.listen(port, () => {
  console.log('listening on *:'+port);
})
