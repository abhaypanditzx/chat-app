const express =  require("express");
const {Server} =require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);

 const io =  new Server(server,{
    cors:"*"
 })


 io.on("connection",(socket)=>{
    console.log("user connected:",socket.id);
    socket.on("s-msg",(msg)=>{
        console.log(msg);
        io.emit("r-msg",msg);
    })
 })
const PORT = 5000;

 server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
 })