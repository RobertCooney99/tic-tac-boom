import React from 'react';
import { useState, useEffect } from 'react';
import Board from './Board';
import Player from './Player';
import { Link } from 'react-router-dom';
import { MdHome, MdReplay, MdShare } from 'react-icons/md';
import './game.css';
import { calculateWinner, compareArrays, removeDuplicatesFromArray, delay, checkIfWinningMove, calculateSurroundingCoordinates, checkIfSetUpWinningMove } from './helper/gameUtils';


function GameRobot(props) {
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
      .then(() => cleanUpBomb(x,y))
      .then(() => console.log("BOMB CLEARED FROM BOARD"));
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
    if (playerOneIsNext) {
      robotMakeMove("LIL BOMB");
    }
  }

  const clearBoardFromExplosion = () => {
    const newSquares = [...new Array(3)].map(()=> [...new Array(3)].map(()=> null));
    setBoard(newSquares);
    setBombInProgress(false);
    if (playerOneIsNext) {
      robotMakeMove("AFTER BOMB");
    }
  }

  const robotMakeMove = (calledBy) => {
    if (!playerOneIsNext && !bombInProgress) {
      const winningMoves = [];
      const gameSavingMoves = [];
      const setUpWinningMove = [];
      const blockOpponentSetUp = [];
      const otherMoves = [];

      for (let x = 0; x <= 2; x++) {
        for (let y = 0; y <= 2; y++) {
          console.log(`Checking ${x} ${y}`)
          if (board[x][y]) {
            continue;
          }

          if (checkIfWinningMove(board, x, y, playerTwo.emoji)) {
            winningMoves.push([x,y]);
            continue;
          }

          if (checkIfWinningMove(board, x, y, playerOne.emoji)) {
            gameSavingMoves.push([x,y]);
            continue;
          }

          const checkIfSetUpWinningMoveResult = checkIfSetUpWinningMove(board, x, y, playerTwo.emoji);
          if (checkIfSetUpWinningMoveResult) {
            setUpWinningMove.push([[x,y], checkIfSetUpWinningMoveResult]);
            continue;
          }

          const checkIfBlockSetUpWinningMoveResult = checkIfSetUpWinningMove(board, x, y, playerOne.emoji);
          if (checkIfBlockSetUpWinningMoveResult) {
            blockOpponentSetUp.push([[x,y], checkIfBlockSetUpWinningMoveResult]);
            continue;
          }

          otherMoves.push([x,y]);
        }
      }

      setUpWinningMove.sort(sortArrayBySecondColumnDesc);
      blockOpponentSetUp.sort(sortArrayBySecondColumnDesc);

      setTimeout(() => {
        if (winningMoves.length > 0 && !robotMakesMistake(20)) {
          const randomNumber = Math.floor(Math.random() * winningMoves.length);
          handleClick(winningMoves[randomNumber][0], winningMoves[randomNumber][1], true);
          return;
        }

        if (gameSavingMoves.length > 0 && !robotMakesMistake(20)) {
          const randomNumber = Math.floor(Math.random() * gameSavingMoves.length);
          handleClick(gameSavingMoves[randomNumber][0], gameSavingMoves[randomNumber][1], true);
          return;
        }

        if (setUpWinningMove.length > 0 && !robotMakesMistake(20)) {
          const randomMove = selectRandomWeightedValue(setUpWinningMove);
          handleClick(randomMove[0][0], randomMove[0][1], true);
          return;
        }

        if (blockOpponentSetUp.length > 0 && !robotMakesMistake(20)) {
          const randomMove = selectRandomWeightedValue(blockOpponentSetUp);
          handleClick(randomMove[0][0], randomMove[0][1], true);
          return;
        }

        if (otherMoves.length > 0) {
          const randomNumber = Math.floor(Math.random() * otherMoves.length);
          handleClick(otherMoves[randomNumber][0], otherMoves[randomNumber][1], true);
          return;
        }
      }, 750);
    }
  }

  const selectRandomWeightedValue = (array, multiplier = 1) => {
    let weightedArray = [];
    for (let value of array) {
      for (let i = 0; i < (value[1] * multiplier); i++) {
        weightedArray.push(value);
      }
    }
    const randomIndex = Math.floor(Math.random() * weightedArray.length);
    return array[randomIndex];
  }

  const sortArrayBySecondColumnDesc = (a, b) => {
    return sortArrayBySecondColumn(a, b, false);
  }

  const sortArrayBySecondColumn = (a, b, asc = true) => {
      const modifier = (asc) ? 1 : -1;
      if (a[1] === b[1]) {
          return 0;
      }
      else {
          return (a[1] < b[1]) ? (-1 * modifier) : (1 * modifier);
      }
  }

  const robotMakesMistake = (chance) => {
    const randomNumber = Math.floor(Math.random() * 100);
    return (randomNumber < chance);
  }

  const placeBombOnBoard = (x,y,bomb) => {
    const current = board.map((x) => x);
    current[x][y] = bomb;
    setBoard(current);
    setBombInProgress(true);
  }

  const explodeBomb = (x,y) => {
    let newSquares = board.map((x) => x);
    newSquares[x][y] = '💥';
    setBoard(newSquares);
  }

  const spreadBombToSurroundingArea = (x,y) => {
    const surroundingCoordinates = calculateSurroundingCoordinates(x,y,false);
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
        surroundingCoordinates.push(calculateSurroundingCoordinates(coordinates[0], coordinates[1], false));
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

  const handleClick = (x,y,robot) => {
    console.log("Handling click at: " + x + "," + y);
    props.socket.emit('boardClick', {xCoordinate: x, yCoordinate: y});

    if (calculateWinner(board) || board[x][y] || bombInProgress || (!playerOneIsNext && !robot)) {
      console.log(board[x][y]);
      console.log("REJECTED");
      return false;
    }

    console.log("ACCEPTED");

    const randomNumber = Math.floor(Math.random() * 4);
    let bomb;
    if (randomNumber === 1) {
      bomb = true;
    }

    if (!bomb) {
      const current = board.map((x) => x);
      current[x][y] = playerOneIsNext ? playerOne.getEmoji() : playerTwo.getEmoji();
      setBoard(current);
      setPlayerOneIsNext(!playerOneIsNext);
    } else {
      const randomNumber = Math.floor(Math.random() * 4);
      if (randomNumber === 1) {
        plantBigBomb(x,y);
      } else {
        plantSmallBomb(x,y);
      }
    }

    setPlayerOneIsNext(!playerOneIsNext);

    return true;
  }

  useEffect(() => {
    console.log("PLAYER CHANGED");
    console.log(playerOneIsNext);
    if (!playerOneIsNext && !bombInProgress) {
      robotMakeMove("PLAYER CHANGE");
    }
  }, [playerOneIsNext]); 

  useEffect(() => {
    console.log(`BOMB CHANGED: PLAYER NEXT IS ${playerOneIsNext}`);
    if (!playerOneIsNext && !bombInProgress && (playerOneIsNext != undefined)) {
      robotMakeMove("BOMB CHANGE");
    }
  }, [bombInProgress]); 

  const resetGame = () => {
    if (!bombInProgress) {
      setBoard([[null, null, null], [null, null, null], [null, null, null]]);
      setPlayerOneIsNext(true);
      setBombInProgress(false);
    }
  }

  let status;
  if (bombInProgress) {
    status = 'BOOM!';
  } else {
    const winner = calculateWinner(board);
    if (winner) {
      status = `${winner} wins!`;
    } else {
      status = `${playerOneIsNext ? "Your" : "Robot's"} turn`;
    }
  }

  return (
    <div className="container">
      <div className="game">
        <div className="game-info">
          <div>{status}</div>
        </div>
        <div className="game-board">
          <Board squares={board} onClick={(x,y) => handleClick(x,y,false)} />
        </div>
        <div className="game-controls">
          <div className="game-control">
            <Link to="/"><MdHome size={50} color={"#222"} onClick={() => resetGame()} /></Link>
          </div>
          <div className="game-control">
            <MdReplay size={50} color={"#222"} onClick={() => resetGame()} /> 
          </div>
          <div className="game-control">
            <MdShare size={50} color={"#222"} onClick={() => {}} /> 
          </div>
          </div>
      </div>
    </div>
  );
}

export default GameRobot;