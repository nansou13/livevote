const app = require('express')();
const http = require('http').createServer(app);
const origin = process.env.origin || 'http://localhost:3000'; // "http://192.168.1.66:3000";
const io = require('socket.io')(http, {
  cors: {
    //   origin: "http://localhost:3000", "http://192.168.1.66:3000"
    origin,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const ROOM = 'livevote';

let RoomData = {}

const getRoom = (socket) => {
  return socket.handshake.query.room !== '' ? socket.handshake.query.room : ROOM
}

io.on('connection', (socket) => {
  console.log('a user connected : ', socket.id, socket.handshake.query.room);
  const currentRoom = getRoom(socket)
  socket.join(currentRoom);
  if(!RoomData[currentRoom]){
    RoomData = {...RoomData, [currentRoom] : {
      theme : 'No question...',
      values : [],
      results : [],
      players : [],
      old : [],
    }}
    console.log('add default data in ', currentRoom)
  }
  
  RoomData[currentRoom].players.push({ id: socket.id, pts: 0 });
  io.to(currentRoom).emit('userList', { players: RoomData[currentRoom].players });

  const {players, theme, values, results, old} = RoomData[currentRoom]

  console.log('userList : ', players, 'in room', currentRoom);
  if (theme && values) {
    io.to(socket.id).emit('getTheme', { theme, values, results, old });
    console.log('getTheme', { theme, values, results });
  }

  socket.on('disconnect', () => {
    const currentRoom = getRoom(socket)
    const {players} = RoomData[currentRoom]
    RoomData[currentRoom].players = players.filter((user) => user.id !== socket.id) || [];
    console.log(`user disconnected ${socket.id}`);
    // results = results.filter((user) => user.id != socket.id) || []
    // io.to(ROOM).emit('refreshStats', results);
    io.to(currentRoom).emit('userList', { players });
  });

  socket.on('addNewGame', (newvalues) => {
    let currentRoom = false
    if(newvalues.room){
      currentRoom = newvalues.room;
      if(!RoomData[currentRoom]){
        RoomData = {...RoomData, [currentRoom] : {
          theme : 'No question...',
          values : [],
          results : [],
          players : [],
          old : [],
        }}
      }
    }else{
      currentRoom = getRoom(socket)
    }
    if(RoomData[currentRoom].values.length > 0){
      RoomData[currentRoom].old = [...RoomData[currentRoom].old, {
        theme: RoomData[currentRoom].theme,
        values: RoomData[currentRoom].values,
        results: RoomData[currentRoom].results
      }]
    }
    RoomData[currentRoom].theme = newvalues.theme;
    RoomData[currentRoom].values = newvalues.values;
    RoomData[currentRoom].results = [];

    const {theme, values, old} = RoomData[currentRoom]

    console.log('runVote', RoomData);
    io.to(currentRoom).emit('RunVote', { theme, values, old });
  });

  socket.on('vote', (elm) => {
    const currentRoom = getRoom(socket)
    const {results} = RoomData[currentRoom]
    // check si blacklisted
    const isBlacklisted = results.find((user) => user.id === socket.id);
    console.log('blacklisted', isBlacklisted);
    if (!isBlacklisted) {
      results.push({ id: socket.id, choice: elm });
      console.log('voted', { id: socket.id, choice: elm }, results);
    }
    io.to(currentRoom).emit('refreshStats', results);
  });
});

const port = process.env.PORT || 4000;
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
