import React from 'react';
import { useState, useEffect } from 'react';
import GameBoard from '../GameBoard';
import GameStatus from './GameStatus.jsx';
import GameControls from './GameControls.jsx';
import GameControl from './GameControl.jsx';
import StyledGame from './StyledGame';
import SoloGameManager from './SoloGameManager.js';
import Robot from './Robot.js';

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
      <StyledGame>
        <GameStatus status={status} />
        <GameBoard squares={board} onClick={(x,y) => game.handleClick(x,y,false)} />
        <GameControls>
          <GameControl iconType={"home"} onClick={() => game.resetGame()} link={true} to={"/"} />
          <GameControl iconType={"reset"} onClick={() => game.resetGame()} />
          <GameControl iconType={"share"} onClick={() => {}} /> 
        </GameControls>
      </StyledGame>
  );
}

export default SoloGame;
