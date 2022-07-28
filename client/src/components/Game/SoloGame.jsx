import React from 'react';
import { useState, useEffect } from 'react';
import GameBoard from '../GameBoard';
import GameStatus from './GameStatus';
import GameControls from './GameControls';
import GameControl from './GameControl';
import Player from './Player';
import './game.css';
import SoloGameManager from './SoloGameManager';
import Robot from './Robot';

let robot = new Robot();
let game = new SoloGameManager(robot);

function SoloGame(props) {
  const playerOne = new Player('❌');
  const playerTwo = new Player('⭕️');

  const [board, setBoard] = useState([[null, null, null], [null, null, null], [null, null, null]]);
  const [playerOneIsNext, setPlayerOneIsNext] = useState(true);
  const [bombInProgress, setBombInProgress] = useState(false);

  const handleClick = (x,y,robot) => {
    if (!playerOneIsNext && !robot) {
        return false;
    }
    game.handleClick(x,y,board,bombInProgress,playerOneIsNext,playerOne,playerTwo,setBoard,setPlayerOneIsNext,setBombInProgress);
  }

  const resetGame = () => {
    game.resetGame(bombInProgress, setBoard, setPlayerOneIsNext, setBombInProgress);
    game = new SoloGameManager(robot);
  }

  const robotMakeMove = () => {
    game.robotMakeMove(board,bombInProgress,playerOneIsNext,playerOne,playerTwo,setBoard,setPlayerOneIsNext,setBombInProgress);
  }

  const status = game.calcStatus(bombInProgress, board, playerOneIsNext);

  useEffect(() => {
    if (!playerOneIsNext && !bombInProgress) {
      robotMakeMove();
    }
  }, [playerOneIsNext]); 

  useEffect(() => {
    if (!playerOneIsNext && !bombInProgress && (playerOneIsNext != undefined)) {
      robotMakeMove();
    }
  }, [bombInProgress]); 

  return (
      <div className="game">
        <GameStatus status={status} />
        <GameBoard squares={board} onClick={(x,y) => handleClick(x,y,false)} />
        <GameControls>
          <GameControl iconType={"home"} onClick={() => resetGame()} link={true} to={"/"} />
          <GameControl iconType={"reset"} onClick={() => resetGame()} />
          <GameControl iconType={"share"} onClick={() => {}} /> 
        </GameControls>
      </div>
  );
}

export default SoloGame;
