import io from 'socket.io-client';

const socketserver = process.env.REACT_APP_SOCKETSERVER || 'http://localhost:4000'; // "http://192.168.1.66:4000";
export const socket = io(socketserver);
export function sendMessage(id, value) {
  socket.emit(id, value);
}

export function addPlayer(name) {
  socket.emit('addPlayer', name);
}

export function updateUserList(callBack) {
  socket.on('userList', ({ players }) => {
    callBack(players);
  });
}

export function updateMessageList(callBack) {
  socket.on('message', ({ message }) => {
    callBack(message);
  });
}

export function startGame(callBack) {
  socket.on('RunVote', ({ theme, values }) => {
    callBack({ theme, values });
  });
}
export function getTheme(callBack) {
  socket.on('getTheme', ({ theme, values, results }) => {
    callBack({ theme, values, results });
  });
}
export function refreshStat(callBack) {
  socket.on('refreshStats', (results) => {
    callBack(results);
  });
}