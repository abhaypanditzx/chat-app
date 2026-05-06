const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: "*",
});

const users = {};
io.on("connection", (socket) => {
  socket.on("join", (username) => {
    users[socket.id] = username;
    io.emit("user-joined", username);
    io.emit("active-users", Object.values(users));
  });
  socket.on("s-msg", (msg) => {
    io.emit("r-msg", msg);
  });

  socket.on("disconnect", () => {
    const username = users[socket.id];
    delete users[socket.id];
    io.emit("user-disconnected", username);
    io.emit("active-users", Object.values(users));
  });
});
const PORT = 5000;

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
