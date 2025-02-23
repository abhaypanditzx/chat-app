const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "https://chat-app-ten-liard.vercel.app", // Change dynamically
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    }
});

io.on("connection", (socket) => {
    console.log(`[${new Date().toLocaleTimeString()}] User connected: ${socket.id}`);

    // Handle incoming messages
    socket.on("sendMessage", (data) => {
        console.log(`[${new Date().toLocaleTimeString()}] Message received from ${data.username}: ${data.message}`);

        // Broadcast message to all except the sender
        socket.broadcast.emit("receiveMessage", data);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log(`[${new Date().toLocaleTimeString()}] User disconnected: ${socket.id}`);
    });
});

// Health check route
app.get("/test", (req, res) => {
    res.json({ message: "Server is working!" });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT}`);
});
