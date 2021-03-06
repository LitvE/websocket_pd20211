import socket from "./index";

export const emitTest = (data, options) => socket.emit('test', data, options);

export const emitMessage = (room, message) => socket.emit('message', room, message);

export const emitJoinRoom = (room) => socket.emit('join-to-room', room);
