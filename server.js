const express = require('express');
const socketio = require('socket.io');

const http = require('http');

const app = express();

const server = http.createServer(app);
const io = socketio(server);

let users = {};

let socketMap = {};

io.on('connection',(socket)=>{
    console.log("New Socket Formed with id = ", socket.id);

    socket.on("Login",(data)=>{

        if(users[data.inputVal]){
            if(users[data.inputVal] === data.inputPass){
                socket.join(data.inputVal);
                socket.emit("logged_in");
                socketMap[socket.id] = data.inputVal;
            }else{
                socket.emit("logged_failed")
            }
        }else{
            users[data.inputVal] = data.inputPass;
            socket.join(data.inputVal);
            socket.emit("logged_in");
            socketMap[socket.id] = data.inputVal;
        }

        console.log(socketMap);
    })

    socket.on("send_msg",(data)=>{
        data.from = socketMap[socket.id];
        if(data.to){
            io.to(data.to).emit("rcv_msg",data);
        }else{
            socket.broadcast.emit("rcv_msg",data);
        }
    })
})

app.use('/',express.static(__dirname + '/public'));

server.listen(3344, ()=> console.log("Server started at http://localhost:3344"));