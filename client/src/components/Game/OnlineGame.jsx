import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import io from "socket.io-client";
import GameBoard from '../GameBoard';
import GameStatus from './GameStatus';
import GameControls from './GameControls';
import GameControl from './GameControl';

function OnlineGame(props) {
    const { id } = useParams();
    const [gameActive, setGameActive] = useState(false);
    const [board, setBoard] = useState([[null, null, null], [null, null, null], [null, null, null]]);
    const [status, setStatus] = useState();
    const [resetCount, setResetCount] = useState(0);
    const [joinedGame, setJoinedGame] = useState(false);

    let resetGame;
    let handleClick;

    useEffect(() => {
        const socket = io.connect("http://localhost:3001");

        socket.emit("join", (id));

        socket.on("joined", (joinedGame) => {
            setJoinedGame(joinedGame);
        });

        socket.on("status", (status) => {
            setStatus(status);
        });

        socket.on("board", (board) => {
            setBoard(board);
        });

        socket.on("resetCount", (count) => {
            // Update reset counter
            setResetCount(count);
        });

        socket.on("gameActive", (gameActive) => {
            // Update game style based on value
            setGameActive(gameActive);
        });

        // setInterval(function() {
        //     // Emit a regular heartbeat to keep the game active
        //     socket.emit('heartbeat');
        // }, 2000);

        resetGame = () => {
            socket.emit("resetGame");
        }

        handleClick = (x,y) => {
            props.socket.emit('boardClick', {xCoordinate: x, yCoordinate: y});
        }

        return () => {
            // Disconnect socket on component unmount
            socket.disconnect();
        }
    }, []);

    return (
        <div>
            {joinedGame ?
                <div className="game">
                    <GameStatus status={status} />
                    <GameBoard squares={board} onClick={(x,y) => handleClick(x,y)} />
                    <GameControls>
                        <GameControl iconType={"home"} onClick={() => resetGame()} link={true} to={"/"} />
                        <GameControl iconType={"reset"} onClick={() => resetGame()} />
                        <GameControl iconType={"share"} onClick={() => {}} /> 
                    </GameControls>
                </div>

                :
                
                <div className="game">
                    <p>{status}</p>
                    <GameControl iconType={"home"} link={true} to={"/"} />
                </div>
            }
        </div>
    );
}

export default OnlineGame;