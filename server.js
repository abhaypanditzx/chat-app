const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();

const server = http.createServer(app);

const io =  new Server(server,{
    cors:"*"
});


io.on("connection",(socket)=>{
console.log("user connected",socket.id);
socket.on("send-message",(msg)=>{
io.emit("receive-message",msg)
})
})

server.listen(5000,(error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("server started on port 5000")
    }
})