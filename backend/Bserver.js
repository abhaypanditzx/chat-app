const express = require('express');
const http = require("http")
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();
const app = express();
app.use(express.json());
const server = http.createServer(app);
app.use(cors());
const io = new Server(server, {
    cors: {
        origin: 'https://chat-app-ten-liard.vercel.app',
        methods: ['POST' , 'GET'],
        allowedHeaders: ['Content-Type'],
    }
})
io.on('connection', (socket) => {
    console.log('user connected:', socket.id)

    // message
    socket.on('sendMessage',(data) => {
        // const messageData = { ID: socket.id,text: data }
        // console.log(`${messageData.ID}: ${messageData.text}`)
        console.log(data)
        io.emit('receiveMessage',data)
    })
    

    // disconnect
    socket.on('disconnect',()=>{
        console.log("user disconnected")
    })

})

app.get("/test", (req, res) => {
    res.json({ message: "Server is working!" });
});


const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(` server is running on port:${PORT} `)
})
