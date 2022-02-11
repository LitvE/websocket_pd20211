const {testHandler, messageHandler} = require('./events');

module.exports = function connectionWs(socket){
    const hanshake = socket.hanshake;
    console.dir(hanshake);
    socket.on('test', testHandler);
    socket.on('message', messageHandler);
};