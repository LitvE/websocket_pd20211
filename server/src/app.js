//Websocket нужно писать и на сервере и на клиенте
//Websocket это протокол!!

const express = require('express');
const PORT = process.env.PORT || 3000;
/*
const app = express();
const expressWs = require('express-ws')(app);
const gWss = expressWs.getWss('/');

app.use(express.json());

const messages = [];

app.ws('/', function(ws, req){
    //метод on слушает сообщение
    ws.on('message', function(msg){
        console.log(msg);
        messages.push(msg);
        //ws.send(msg); // отправка сообщения для 1 клиента
        
        gWss.clients.forEach(client => {
            //client.send(msg);
            client.send(JSON.stringify([msg]));
        }); // отправка сообщения/-й всем клиентам
    });
    console.log('socket', req.testing);
});*/

const http = require('http');
//const socketIO = require('socket.io');
const {Server} = require('socket.io');
const router = require('./router')
const cors = require('cors');
const connectionWs = require('./ws/index');


const app = express();

//const server = http.createServer(app);
const httpServer = http.createServer(app);
/*const io = socketIO(server, {
    cors: {
      origin: 'http://127.0.0.1:3000',
      methods: ['GET', 'POST'],
    },
});*/

const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: false,
    },
});

app.use(cors());
app.use(express.json());
app.use(router);


// io.on('connection', function(socket){
//     const hanshake = socket.hanshake;
//     console.dir(hanshake);
//     socket.on('test', (data, options) => {
//         console.log('data=', data);
//         console.log('options=', options);
//     });
// });
/*
const rooms = ['room1', 'room2'];


const joinToRoom = socket => {
    rooms.forEach((room) => {
        socket.join(room);
    })
}

io.on('connection', function connectionHandler(socket){
    joinToRoom(socket);
    socket.on('message', (room, message) => {
        io.in(room).emit('new-message', room, message);
    });
    socket.on('join-to-room', (room) => {});
});*/

io.on('connection', connectionWs);

httpServer.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));