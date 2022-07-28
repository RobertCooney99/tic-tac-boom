import React from 'react';
import { useState, useEffect } from 'react';
import GameBoard from '../GameBoard';
import GameStatus from './GameStatus';
import GameControls from './GameControls';
import GameControl from './GameControl';
import './game.css';
import SoloGameManager from './SoloGameManager';
import Robot from './Robot';

let robot = new Robot();
let game = new SoloGameManager(robot);

function SoloGame(props) {
  const [board, setBoard] = useState([[null, null, null], [null, null, null], [null, null, null]]);
  const [status, setStatus] = useState();

  useEffect(() => {
    game.setMethods(setBoard, setStatus);
    game.initialiseBoard(board);
    game.calcStatus(board);
  }, []);

  return (
      <div className="game">
        <GameStatus status={status} />
        <GameBoard squares={board} onClick={(x,y) => game.handleClick(x,y,false)} />
        <GameControls>
          <GameControl iconType={"home"} onClick={() => game.resetGame()} link={true} to={"/"} />
          <GameControl iconType={"reset"} onClick={() => game.resetGame()} />
          <GameControl iconType={"share"} onClick={() => {}} /> 
        </GameControls>
      </div>
  );
}

export default SoloGame;
