const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

const manager = require('./GameManager');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

const lobbies = {};

const serverPortNumber = 3001;

server.listen(serverPortNumber, () => {
    console.log("Server is running on port number: " + serverPortNumber);
});

io.on("connection", (socket) => {
    console.log(`User Connected. [SocketID: ${socket.id}]`);
    socket.emit("status", "Joining game...");

    socket.on("join", (roomID) => {
        console.log("JOINING");
        console.log(lobbies);
        if (roomID in lobbies) {
            if (lobbies[roomID].playerCount === 2) {
                socket.emit("status", "Room is full.");
            } else {
                lobbies[roomID].playerCount = lobbies[roomID].playerCount + 1;
                socket.join(roomID);
                io.to(roomID).emit("status", `${socket.id} joined game...`);
                socket.emit("joined", true);
            }
        } else {
            lobbies[roomID] = {
                playerCount: 1
            };
            socket.join(roomID);
            io.to(roomID).emit("status", `${socket.id} joined game...`);
            socket.emit("joined", true);
        }
    });

    socket.on('disconnect', () => {
        console.log(`User Disconnected. [SocketID: ${socket.id}]`);
    });

    socket.on('heartbeat', () => {
        console.log(`Heartbeat received. socketID: ${socket.id}, time: ${Date.now()}`);
    });

    socket.on('boardClick', (clickData) => {
        console.log(`Board Click. [Coordinates: ${clickData.xCoordinate},${clickData.yCoordinate}]`);
    })
});
