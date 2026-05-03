const express =  require("express");
const {Server} =require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);

 const io =  new Server(server,{
    cors:"*"
 })

const users = {};
io.on("connection",(socket)=>{
    console.log("user connected:",socket.id);
    socket.on("join",(username)=>{
      users[socket.id]=username;
      io.emit("active-users",Object.values(users))
    })
    socket.on("s-msg",(msg)=>{
        console.log(msg);
        io.emit("r-msg",msg);
    })


    socket.on("disconnect",()=>{
      console.log("user disconnected",socket.id);
      delete users[socket.id];
      io.emit("active-users",Object.values(users))
    })
 })
const PORT = 5000;

 server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
 })