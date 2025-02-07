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



const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(` server is running on port:${PORT} `)
})
// const express = require("express");
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);

// app.use(cors());

// // Initialize Socket.io
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // React frontend
//     methods: ["GET", "POST"],
//   },
// });

// // Handle Socket.io Connections
// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("sendMessage", (data) => {
//     io.emit("receiveMessage", data); // Broadcast message to all users
//   });

//   socket.on("disconnect", () => {
//     console.log(`User Disconnected: ${socket.id}`);
//   });
// });

// // Start the server
// const PORT = 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
