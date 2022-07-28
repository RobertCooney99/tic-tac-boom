import React from 'react';
import { useState, useEffect } from 'react';
import GameBoard from '../GameBoard';
import GameStatus from './GameStatus';
import GameControls from './GameControls';
import GameControl from './GameControl';
import './game.css';
import GameManager from './GameManager';

let game = new GameManager();

function LocalGame(props) {
  const [board, setBoard] = useState([[null, null, null], [null, null, null], [null, null, null]]);
  const [status, setStatus] = useState("TIC TAC BOOM");

  useEffect(() => {
    game.setMethods(setBoard, setStatus);
    game.initialiseBoard(board);
    game.calcStatus(board);
  }, []);

  return (
      <div className="game">
        <GameStatus status={status} />
        <GameBoard squares={board} onClick={(x,y) => game.handleClick(x, y)} />
        <GameControls>
          <GameControl iconType={"home"} onClick={() => game.resetGame()} link={true} to={"/"} />
          <GameControl iconType={"reset"} onClick={() => game.resetGame()} />
          <GameControl iconType={"share"} onClick={() => {}} /> 
        </GameControls>
      </div>
  );
}

export default LocalGame;
