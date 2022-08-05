import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import io from "socket.io-client";
import GameBoard from '../GameBoard';
import GameStatus from './GameStatus.jsx';
import GameControls from './GameControls.jsx';
import GameControl from './GameControl.jsx';
import StyledGame from './StyledGame';

function OnlineGame(props) {
    const { id } = useParams();
    const [gameActive, setGameActive] = useState(false);
    const [board, setBoard] = useState([[null, null, null], [null, null, null], [null, null, null]]);
    const [status, setStatus] = useState();
    // const [resetCount, setResetCount] = useState("OOOOOO");
    const [joinedGame, setJoinedGame] = useState(false);
    const [socket, setSocket] = useState();

    let resetGame;
    let handleClick;

    useEffect(() => {
        const socket = io.connect("https://tic-tac-boom-server.herokuapp.com/", {
            'reconnection': false
        });
        setSocket(socket);

        socket.emit("join", (id));

        socket.on("joined", (joinedGame) => {
            setJoinedGame(joinedGame);
        });

        socket.on("gameActive", (gameActive) => {
            setGameActive(gameActive);
        });

        socket.on("status", (status) => {
            setStatus(status);
        });

        socket.on("board", (board) => {
            setBoard(board);
        });

        // socket.on("resetCount", (count) => {
        //     // Update reset counter
        //     // setResetCount(count);
        // });

        socket.on("gameActive", (gameActive) => {
            // Update game style based on value
            setGameActive(gameActive);
            console.log(gameActive);
        });

        socket.on("disconnect", (reason) => {
            setStatus("Connection error.");
            setGameActive(false);
        });

        return () => {
            // Disconnect socket on component unmount
            socket.disconnect();
        }
    }, []);

    handleClick = (x,y) => {
        if (gameActive) {
            socket.emit('boardClick', {xCoordinate: x, yCoordinate: y});
        }
    }

    resetGame = () => {
        socket.emit("resetGame");
    }

    return (
        <div>
            {joinedGame ?
                <StyledGame>
                    <GameStatus status={status} />
                    <GameBoard gameActive={gameActive} squares={board} onClick={(x,y) => handleClick(x,y)} />
                    <GameControls>
                        <GameControl iconType={"home"} link={true} to={"/"} />
                        <GameControl iconType={"reset"} onClick={() => resetGame()} />
                        <GameControl iconType={"share"} onClick={() => {}} /> 
                    </GameControls>
                </StyledGame>

                :
                
                <StyledGame>
                    <p>{status}</p>
                    <GameControl iconType={"home"} link={true} to={"/"} />
                </StyledGame>
            }
        </div>
    );
}

export default OnlineGame;