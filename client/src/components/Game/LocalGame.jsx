import React from 'react';
import { useState } from 'react';
import GameBoard from '../GameBoard';
import GameStatus from './GameStatus';
import GameControls from './GameControls';
import GameControl from './GameControl';
import Player from './Player';
import './game.css';
import GameManager from './GameManager';

let game = new GameManager();

function LocalGame(props) {
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
      <div className="game">
        <GameStatus status={status} />
        <GameBoard squares={board} onClick={(x,y) => handleClick(x,y)} />
        <GameControls>
          <GameControl iconType={"home"} onClick={() => game.resetGame(bombInProgress, setBoard, setPlayerOneIsNext, setBombInProgress)} link={true} to={"/"} />
          <GameControl iconType={"reset"} onClick={() => game.resetGame(bombInProgress, setBoard, setPlayerOneIsNext, setBombInProgress)} />
          <GameControl iconType={"share"} onClick={() => {}} /> 
        </GameControls>
      </div>
  );
}

export default LocalGame;
