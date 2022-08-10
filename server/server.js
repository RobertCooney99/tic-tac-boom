import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import cors from 'cors';

import { lobbyManager } from './utils/lobbyManager.js';

const app = express();

app.use(cors());

const server = http.createServer(app);

const serverPortNumber = 3001;

server.listen(process.env.PORT || serverPortNumber, () => {
    console.log("Server is running on port number: " + serverPortNumber);
});

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

const lobby = lobbyManager(io);

io.on("connection", (socket) => {
    console.log(`User connected. {socket: ${socket.id}}`);
    socket.emit("status", "Joining game...");

    socket.on("join", (roomID) => {
        lobby.handleJoinLobby(roomID, socket);
    });

    socket.on('disconnect', () => {
        lobby.handleUserDisconnected(socket);
    });

    socket.on('boardClick', (clickData) => {
        lobby.handleBoardClick(socket, clickData);
    })

    socket.on("resetGame", () => {
        lobby.handleResetGame(socket);
    });
});