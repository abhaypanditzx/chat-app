const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
    console.log(`✅ A user connected: ${socket.id}`);

    // **Listen for messages and send with sender ID**
    socket.on("sendMessage", (data) => {
        const messageData = { sender: socket.id, text: data };
        console.log(`📩 Message received:`, messageData);
        io.emit("receiveMessage", messageData); // ✅ Send with sender ID
    });

    socket.on("disconnect", () => {
        console.log(`❌ User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
