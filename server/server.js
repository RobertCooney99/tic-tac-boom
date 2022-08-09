import express from 'express';
const app = express();
import http from 'http';
import {Server} from 'socket.io';
import cors from 'cors';

import OnlineGameManager from './utils/OnlineGameManager.js';

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

const lobbies = {};
const activePlayers = {};

const serverPortNumber = 3001;

server.listen(process.env.PORT || serverPortNumber, () => {
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
                if (!lobbies[roomID].playerOne) {
                    lobbies[roomID].playerOne = {};
                    lobbies[roomID].playerOne.socket = socket.id;
                } else {
                    lobbies[roomID].playerTwo = {};
                    lobbies[roomID].playerTwo.socket = socket.id;
                }
                socket.join(roomID);
                activePlayers[socket.id] = {};
                activePlayers[socket.id].roomID = roomID;
                io.to(roomID).emit("status", `Starting game...`);
                socket.emit("joined", true);
                lobbies[roomID].gameManager = new OnlineGameManager();
                let setBoard = (board) => {
                    io.to(roomID).emit("board", board);
                }

                let setStatus = (playerOneStatus, playerTwoStatus) => {
                    io.to(lobbies[roomID].playerOne.socket).emit("status", playerOneStatus);
                    io.to(lobbies[roomID].playerTwo.socket).emit("status", playerTwoStatus);
                }
                lobbies[roomID].gameManager.setMethods(setBoard, setStatus);
                lobbies[roomID].gameManager.initialiseBoard([[null, null, null], [null, null, null], [null, null, null]]);
                lobbies[roomID].gameManager.calcStatus();
                io.to(roomID).emit("gameActive", true);
            }
        } else {
            lobbies[roomID] = {};
            lobbies[roomID].playerCount = 1;
            lobbies[roomID].playerOne = {};
            lobbies[roomID].playerOne.socket = socket.id;
            socket.join(roomID);
            activePlayers[socket.id] = {};
            activePlayers[socket.id].roomID = roomID;
            io.to(roomID).emit("status", `Waiting for opponent.`);
            socket.emit("joined", true);
        }
    });

    socket.on('disconnect', () => {
        console.log(`User Disconnected. [SocketID: ${socket.id}]`);
        if (!activePlayers[socket.id]) {
            return;
        }
        console.log(activePlayers);
        console.log(socket.id);
        console.log(activePlayers[socket.id]);
        const roomID = activePlayers[socket.id].roomID;
        lobbies[roomID].playerCount = lobbies[roomID].playerCount - 1;
        if (lobbies[roomID].playerOne.socket) {
            if (lobbies[roomID].playerOne.socket === socket.id) {
                delete lobbies[roomID].playerOne;
            }
        } else if (lobbies[roomID].playerTwo.socket) {
            if (lobbies[roomID].playerTwo.socket === socket.id) {
                delete lobbies[roomID].playerTwo;
            }
        }
        delete activePlayers[socket.id];
        if (lobbies[roomID].playerCount === 0) {
            delete lobbies[roomID];
        } else {
            lobbies[roomID].gameManager.resetGame();
        }

        socket.to(roomID).emit("status", `Opponent disconnected.`);
        socket.to(roomID).emit("gameActive", false);
    });

    socket.on('boardClick', (clickData) => {
        console.log(`Board Click. [Coordinates: ${clickData.xCoordinate},${clickData.yCoordinate}]`);
        console.log(socket.id);
        console.log(activePlayers);
        if (!activePlayers[socket.id]) {
            return;
        }
        const roomID = activePlayers[socket.id].roomID;
        if (lobbies[roomID].gameManager.playerOneIsNext && (lobbies[roomID].playerOne.socket !== socket.id)) {
            return;
        } else if (!lobbies[roomID].gameManager.playerOneIsNext && (lobbies[roomID].playerTwo.socket !== socket.id)) {
            return;
        }
        lobbies[roomID].gameManager.handleClick(clickData.xCoordinate, clickData.yCoordinate);
    })

    socket.on("resetGame", () => {
        console.log(`RESET GAME: ${socket.id}`);
        let resetCount = 0;
        if (!activePlayers[socket.id]) {
            return;
        }
        const roomID = activePlayers[socket.id].roomID;
        if (lobbies[roomID].playerOne.socket === socket.id) {
            if (lobbies[roomID].playerOne.reset == true) {
                lobbies[roomID].playerOne.reset = false;
            } else {
                lobbies[roomID].playerOne.reset = true
                resetCount += 1;
            }
        } else if (lobbies[roomID].playerTwo.socket === socket.id) {
            if (lobbies[roomID].playerTwo.reset == true) {
                lobbies[roomID].playerTwo.reset = false;
            } else {
                lobbies[roomID].playerTwo.reset = true
                resetCount += 1;
            }
        }

        if (resetCount === 1 || resetCount === 0) {
            io.to(roomID).emit("resetCount", resetCount);
        }

        if (lobbies[roomID].playerOne.reset && lobbies[roomID].playerTwo.reset) {
            lobbies[roomID].gameManager.resetGame();
            io.to(roomID).emit("resetCount", 0);
            lobbies[roomID].playerOne.reset = false;
            lobbies[roomID].playerTwo.reset = false;
        }
    });
});
