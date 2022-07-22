import React from 'react';
import { useState } from 'react';
import GameBoard from '../GameBoard';
import Player from './Player';
import { Link } from 'react-router-dom';
import { MdHome, MdReplay, MdShare } from 'react-icons/md';
import './game.css';
import GameManager from './GameManager';

let game = new GameManager();

function GameRefactored(props) {
  const playerOne = new Player('❌');
  const playerTwo = new Player('⭕️');

  const [board, setBoard] = useState([[null, null, null], [null, null, null], [null, null, null]]);
  const [playerOneIsNext, setPlayerOneIsNext] = useState(true);
  const [bombInProgress, setBombInProgress] = useState(false);

  const handleClick = (x,y) => {
    game.handleClick(x,y,board,bombInProgress,playerOneIsNext,playerOne,playerTwo,setBoard,setPlayerOneIsNext,setBombInProgress);
  }

  const status = game.calcStatus(bombInProgress, board, playerOneIsNext, playerOne, playerTwo);

  return (
    <div className="container">
      <div className="game">
        <div className="game-info">
          <div>{status}</div>
        </div>
        <div className="game-board">
          <GameBoard squares={board} onClick={(x,y) => handleClick(x,y)} />
        </div>
        <div className="game-controls">
          <div className="game-control">
            <Link to="/"><MdHome size={50} color={"#222"} onClick={() => game.resetGame(bombInProgress, setBoard, setPlayerOneIsNext, setBombInProgress)} /></Link>
          </div>
          <div className="game-control">
            <MdReplay size={50} color={"#222"} onClick={() => game.resetGame(bombInProgress, setBoard, setPlayerOneIsNext, setBombInProgress)} /> 
          </div>
          <div className="game-control">
            <MdShare size={50} color={"#222"} onClick={() => {}} /> 
          </div>
          </div>
      </div>
    </div>
  );
}

export default GameRefactored;
