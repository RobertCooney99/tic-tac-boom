import React, { useEffect } from 'react';
import { useState } from 'react';
import GameBoard from '../GameBoard';
import Player from './Player';
import { Link } from 'react-router-dom';
import { MdHome, MdReplay, MdShare } from 'react-icons/md';
import './game.css';
import { calculateWinner, compareArrays, removeDuplicatesFromArray } from '../../utils/helper/gameUtils';
import { delay } from '../../utils/delay';
import GameManager from './GameManager';

let game = new GameManager();

function GameRefactored(props) {
  const playerOne = new Player('❌');
  const playerTwo = new Player('⭕️');

  const [board, setBoard] = useState([[null, null, null], [null, null, null], [null, null, null]]);
  const [playerOneIsNext, setPlayerOneIsNext] = useState(true);
  const [bombInProgress, setBombInProgress] = useState(false);

  const plantSmallBomb = (x,y) => {
    Promise.resolve()
      .then(() => placeBombOnBoard(x,y,'🧨'))
      .then(() => delay(400))
      .then(() => explodeBomb(x,y))
      .then(() => delay(300))
      .then(() => spreadBombToSurroundingArea(x,y))
      .then(() => delay(300))
      .then(() => cleanUpBomb(x,y));
  }

  const plantBigBomb = (x,y) => {
    Promise.resolve()
      .then(() => placeBombOnBoard(x,y,'💣'))
      .then(() => delay(500))
      .then(() => explodeBomb(x,y))
      .then(() => delay(250))
      .then(() => spreadBigBombToSurroundingArea([[x,y]], [[x,y]]))
      .then(() => delay(250))
      .then(() => clearBoardFromExplosion());
  }

  const cleanUpBomb = (x,y) => {
    const surroundingCoordinates = calculateSurroundingCoordinates(x,y);
    let newSquares = board.map((x) => x);
    newSquares[x][y] = null;
    for (let coordinates of surroundingCoordinates) {
      newSquares[coordinates[0]][coordinates[1]] = null;
    }
    setBoard(newSquares);
    setBombInProgress(false);
  }

  const placeBombOnBoard = (x,y,bomb) => {
    const current = board.map((x) => x);
    current[x][y] = bomb;
    setBoard(current);
    setPlayerOneIsNext(!playerOneIsNext);
    setBombInProgress(true);
  }

  const explodeBomb = (x,y) => {
    let newSquares = board.map((x) => x);
    newSquares[x][y] = '💥';
    setBoard(newSquares);
  }

  const spreadBombToSurroundingArea = (x,y) => {
    const surroundingCoordinates = calculateSurroundingCoordinates(x,y);
    const newSquares = board.map((x) => x);
    for (let coordinates of surroundingCoordinates) {
      newSquares[coordinates[0]][coordinates[1]] = '💥';
    }
    console.log(newSquares);
    setBoard(newSquares);
  }

  const spreadBigBombToSurroundingArea = (coordinatesToExplode, alreadyExplodedSquares) => {
    if (alreadyExplodedSquares.length >= 9) {
      return;
    } else {
      let surroundingCoordinates = [];
      let allSurroundingCoordinates = [];
      for (let coordinates of coordinatesToExplode) {
        surroundingCoordinates.push(calculateSurroundingCoordinates(coordinates[0], coordinates[1]));
      }
      for (let coordinatesArray of surroundingCoordinates) {
        for (let coordinates of coordinatesArray) {
          allSurroundingCoordinates.push(coordinates);
        }
      }
      allSurroundingCoordinates = [...new Set(allSurroundingCoordinates)];

      let squaresToExplode = allSurroundingCoordinates.filter(x => {
        for (let y of alreadyExplodedSquares) {
          if (compareArrays(x,y)) {
            return false;
          }
        }
        return true;
      });

      squaresToExplode = removeDuplicatesFromArray(squaresToExplode);

      const newSquares = board.map((x) => x);
      for (let coordinates of squaresToExplode) {
        newSquares[coordinates[0]][coordinates[1]] = '💥';
        alreadyExplodedSquares.push([coordinates[0],coordinates[1]]);
      }
      setBoard(newSquares);
      return Promise.resolve().then(() => delay(250)).then(() => spreadBigBombToSurroundingArea(squaresToExplode, alreadyExplodedSquares));
    }
  }

  const clearBoardFromExplosion = () => {
      const newSquares = [...new Array(3)].map(()=> [...new Array(3)].map(()=> null));
      setBoard(newSquares);
      setBombInProgress(false);
  }

  const calculateSurroundingCoordinates = (x,y) => {
    let surroundingCoordinates = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let xCoordinate = x + i;
        let yCoordinate = y + j;
        if ( xCoordinate < 0 || yCoordinate < 0 || xCoordinate > 2 || yCoordinate > 2 || (x === xCoordinate && y === yCoordinate) || (Math.abs(i) === Math.abs(j))) { 
          continue;
        }
        surroundingCoordinates.push([xCoordinate, yCoordinate]);
      }
    }

    return surroundingCoordinates;
  }

  const handleClick = (x,y) => {
    game.handleClick(x,y,board,bombInProgress,playerOneIsNext,playerOne,playerTwo,setBoard,setPlayerOneIsNext,plantBigBomb,plantSmallBomb);
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
