//Websocket нужно писать и на сервере и на клиенте
//Websocket это протокол!!

const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();
const expressWs = require('express-ws')(app);

app.use(express.json());
app.ws('/', function(ws, req){
    //метод on слушает сообщение
    ws.on('message', function(msg){
        console.log(msg);
        ws.send(msg);
    });
    console.log('socket', req.testing);
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));