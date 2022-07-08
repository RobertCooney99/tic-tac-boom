const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

const serverPortNumber = 3001;

server.listen(serverPortNumber, () => {
    console.log("Server is running on port number: " + serverPortNumber);
});

io.on("connection", (socket) => {
    console.log(`User Connected. [SocketID: ${socket.id}]`);

    socket.on('disconnect', () => {
        console.log(`User Disconnected. [SocketID: ${socket.id}]`);
    });

    socket.on('boardClick', (clickData) => {
        console.log(`Board Click. [Coordinates: ${clickData.xCoordinate},${clickData.yCoordinate}]`);
    })
});
