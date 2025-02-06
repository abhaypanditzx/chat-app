const cors = require("cors")
const express = require("express")
const {Server} = require("socket.io")
const http = require("http")

const app = express();
const server = http.createServer(app)
const io = new Server(server, {cors:{origin:"http://localhost/3000"}})
app.use(cors())
app.use(express.json())


io.on("connection",(socket)=>{
    console.log(`user is connected ${socket.id}`)
    socket.on("sendMessage",(message)=>{
        console.log(`message received: ${message}`)
        io.emit("receivedMessage",message);
    });
    socket.on("disconnect",()=>{
        console.log(`user disconnected ${socket.id}`)
    })
})
const port = 5000
server.listen(port,()=>{
    console.log(`server is running on port:${port}`)
})
