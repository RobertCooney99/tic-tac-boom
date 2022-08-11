import OnlineGameManager from './OnlineGameManager.js';


export const lobbyManager = (ioServer) => {
    const lobbies = {};
    const activePlayers = {};
    const io = ioServer;


    const handleJoinLobby = (roomID, socket) => {
        console.log(`Attempting to join lobby. {'room': '${roomID}', 'socket': '${socket.id}'}`);
    
        if (roomID in lobbies) {
            console.log(`${roomID} already exists.`);
            if (lobbies[roomID].playerCount === 2) {
                console.log(`Connection to lobby failed. {'room': '${roomID}', 'socket': '${socket.id}', 'reason': 'full'}`);
                socket.emit("status", "Room is full.");
            } else {
                if (!lobbies[roomID].playerOne) {
                    lobbies[roomID].playerOne = {
                        "socket": socket.id
                    };
                } else {
                    lobbies[roomID].playerTwo = {
                        "socket": socket.id
                    };
                }
    
                lobbies[roomID].playerCount = lobbies[roomID].playerCount + 1;
    
                socket.join(roomID);
                console.log(`Connection to lobby successful. {'room': '${roomID}', 'socket': '${socket.id}'}`);
    
                activePlayers[socket.id] = {
                    "roomID": roomID
                };
    
                socket.emit("joined", true);
    
                if (lobbies[roomID]?.playerCount === 2) {
                    console.log(`Creating new game. {'room': '${roomID}'}`);
                    io.to(roomID).emit("status", `Starting game.`);
                    lobbies[roomID].gameManager = new OnlineGameManager();
    
                    let setBoard = (board) => {
                        io.to(roomID).emit("board", board);
                    }
    
                    let setStatus = (playerOneStatus, playerTwoStatus) => {
                        if (lobbies[roomID]?.playerOne?.socket) {
                            io.to(lobbies[roomID].playerOne.socket).emit("status", playerOneStatus);
                        }
                        if (lobbies[roomID]?.playerTwo?.socket) {
                            io.to(lobbies[roomID].playerTwo.socket).emit("status", playerTwoStatus);
                        }
                    }
    
                    lobbies[roomID].gameManager.setMethods(setBoard, setStatus);
                    lobbies[roomID].gameManager.initialiseBoard([[null, null, null], [null, null, null], [null, null, null]]);
                    lobbies[roomID].gameManager.calcStatus();
    
                    io.to(roomID).emit("gameActive", true);
                } else if (lobbies[roomID]?.playerCount === 1) {
                    io.to(roomID).emit("status", `Waiting for opponent.`);
                }
            }
        } else {
            console.log(`Room does not exist. {'room': '${roomID}'}`);
            lobbies[roomID] = {
                "playerCount": 1,
                "playerOne": {
                    "socket": socket.id
                }
            };
    
            activePlayers[socket.id] = {
                "roomID": roomID
            }

            socket.join(roomID);
            console.log(`Connection to lobby successful. {'room': '${roomID}', 'socket': '${socket.id}'}`);

            io.to(roomID).emit("status", `Waiting for opponent.`);
            socket.emit("joined", true);
        }
    };
    
    
    const handleUserDisconnected = (socket) => {
        console.log(`User Disconnected. {'socket': '${socket.id}'}`);
    
        if (!activePlayers[socket.id]) {
            console.log(`Disconnected user not an active player. {'socket': '${socket.id}'}`);
            return;
        }
    
        const roomID = activePlayers[socket.id].roomID;
    
        if (lobbies[roomID]?.playerOne?.socket === socket.id) {
            delete lobbies[roomID].playerOne;
        } else if (lobbies[roomID]?.playerTwo?.socket === socket.id) {
            delete lobbies[roomID].playerTwo;
        }
    
        delete activePlayers[socket.id];
        console.log(`Player removed from active player list. {'socket': '${socket.id}'}`);
    
        if (lobbies[roomID].playerCount === 0) {
            delete lobbies[roomID];
            console.log(`Deleted room. {'room': '${roomID}'}`);
        } else {
            lobbies[roomID]?.gameManager?.resetGame();
            console.log(`Game reset due to disconnected player. {'room': '${roomID}'}`);
        }
    
        lobbies[roomID].playerCount = lobbies[roomID].playerCount - 1;
    
        socket.to(roomID).emit("status", `Opponent disconnected.`);
        socket.to(roomID).emit("gameActive", false);
    };
    
    
    const handleBoardClick = (socket, clickData) => {
        console.log(`Board click. {coordinates: {'x': '${clickData.xCoordinate}', 'y': '${clickData.yCoordinate}'}, 'socket': '${socket.id}'}`);
    
        if (!activePlayers[socket.id]) {
            console.log(`User not an active player - click ignored. {'socket': '${socket.id}'}`);
            return;
        }
    
        const roomID = activePlayers[socket.id].roomID;
    
        if (lobbies[roomID]?.gameManager?.playerOneIsNext && (lobbies[roomID]?.playerOne?.socket !== socket.id)) {
            return;
        } else if (!lobbies[roomID]?.gameManager?.playerOneIsNext && (lobbies[roomID]?.playerTwo?.socket !== socket.id)) {
            return;
        }
    
        lobbies[roomID].gameManager.handleClick(clickData.xCoordinate, clickData.yCoordinate);
    }
    
    
    const handleResetGame = (socket) => {
        console.log(`Attempting to reset game. {socket: ${socket.id}}`);
    
        if (!activePlayers[socket.id]) {
            console.log(`User not an active player - reset ignored. {'socket': '${socket.id}'}`);
            return;
        }
    
        const roomID = activePlayers[socket.id].roomID;
    
        // Check which player is requesting to reset the game.
        // Flip that player's reset request flag (T/F).
        if (lobbies[roomID]?.playerOne?.socket === socket.id) {
            lobbies[roomID].playerOne.reset = !lobbies[roomID].playerOne.reset;
        } else if (lobbies[roomID].playerTwo.socket === socket.id) {
            lobbies[roomID].playerTwo.reset = !lobbies[roomID].playerTwo.reset;
        }
    
        let resetCount = 0;
        if (lobbies[roomID].playerOne.reset) {resetCount += 1};
        if (lobbies[roomID].playerTwo.reset) {resetCount += 1};
    
        if (resetCount === 1 || resetCount === 0) {
            io.to(roomID).emit("resetCount", resetCount);
        } else if (resetCount === 2) {
            console.log(`Resetting game. {'room': '${roomID}'}`);
            lobbies[roomID].gameManager.resetGame();
            lobbies[roomID].playerOne.reset = false;
            lobbies[roomID].playerTwo.reset = false;
            io.to(roomID).emit("resetCount", 0);
        }
    };

    return {
        handleJoinLobby,
        handleUserDisconnected,
        handleBoardClick,
        handleResetGame
    };
}