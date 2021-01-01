var express = require('express');
var app = express();//aplicación express
var server = require('http').Server(app);//servidor node
//Se utiliza http en lugar de express, para utilizar socketio
var io = require('socket.io')(server);//tiene toda al funcionalidad de los sockets (servidor de sockets)

app.use(express.static('public')); //middleware para archivos estáticos

app.get('/hello', function (req, res) {//cuando reciba un get en la ruta /hello  (APIrest)
    res.status(200).send("Hello world");
});

var messages = [{
    id: 1,
    text: "Hola, primer mensaje",
    author: "Jorge MataH"
}]
io.on('connection', function (socket) {
    console.log("Alguien se ha conectado con Socekts");
    socket.emit('messages', messages);

    socket.on('newMessage', function (data) {
        messages.push(data);
        io.sockets.emit('messages',messages);
    })
});

server.listen(8080, function () {//Se levanta el servidor
    console.log("Servidor corriendo en http://localhost:8080");
});
