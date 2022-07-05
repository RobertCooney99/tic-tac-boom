import React from 'react';
import { useState } from 'react';
import Board from './Board';
import Player from './Player';
import { MdReplay } from 'react-icons/md';

function calculateWinner(squares) {
  if (squares[0][0] && squares[0][0] === squares[1][1] && squares[0][0] === squares[2][2]) {
    return squares[0][0];
  } else if (squares[2][0] && squares[2][0] === squares[1][1] && squares[2][0] === squares[0][2]) {
    return squares[2][0];
  }

  for (let i = 0; i <= 2; i++) {
    if (squares[i][0] && squares[i][0] === squares[i][1] && squares[i][0] === squares[i][2]) {
      return squares[i][0];
    } else if (squares[0][i] && squares[0][i] === squares[1][i] && squares[0][i] === squares[2][i]) {
      return squares[0][i];
    }
  }

  let count = 0;

  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 2; j++) {
      if (squares[i][j]) {
        count++;
      }
    }
  }

  if (count === 9) {
    return "No one";
  }

  return null;
}

function Game(props) {
  const playerOne = new Player('❌');
  const playerTwo = new Player('⭕️');

  const [board, setBoard] = useState([[null, null, null], [null, null, null], [null, null, null]]);
  const [xIsNext, setXIsNext] = useState(true);
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
      .then(() => delay(300))
      .then(() => spreadBombToSurroundingArea(x,y))
      .then(() => delay(300))
      .then(() => spreadBombToWholeBoard())
      .then(() => delay(300))
      .then(() => clearBoardFromExplosion());
  }

  function delay(duration) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), duration);
    });
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
    setXIsNext(!xIsNext);
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

  const spreadBombToWholeBoard = () => {
      const newSquares = [...new Array(3)].map(()=> [...new Array(3)].map(()=> '💥'));
      setBoard(newSquares);
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
    console.log("Handling click at: " + x + "," + y);

    if (calculateWinner(board) || board[x][y] || bombInProgress) {
      return;
    }

    const randomNumber = Math.floor(Math.random() * 5);
    let bomb;
    if (randomNumber === 1) {
      bomb = true;
    }

    if (!bomb) {
      const current = board.map((x) => x);
      current[x][y] = xIsNext ? playerOne.getEmoji() : playerTwo.getEmoji();
      setBoard(current);
      setXIsNext(!xIsNext);
    } else {
      const randomNumber = Math.floor(Math.random() * 2);
      if (randomNumber === 1) {
        plantSmallBomb(x,y);
      } else {
        plantBigBomb(x,y);
      }
    }
  }

  const resetGame = () => {
    setBoard([[null, null, null], [null, null, null], [null, null, null]]);
    setXIsNext(true);
    setBombInProgress(false);
  }

    let status;
    if (bombInProgress) {
      status = 'BOOM!';
    } else {
      const winner = calculateWinner(board);
      if (winner) {
        status = `${winner} wins!`;
      } else {
        status = `Player ${xIsNext ? playerOne.getEmoji() : playerTwo.getEmoji()}'s turn...`;
      }
    }

    return (
      <div className="container">
        <header>TIC TAC BOOM</header>
        <div className="game">
          <div className="game-info">
            <div>{status}</div>
          </div>
          <div className="game-board">
            <Board squares={board} onClick={(x,y) => handleClick(x,y)} />
          </div>
          <div className="game-controls">
            <MdReplay size={50} color={"#222"} onClick={() => resetGame()}></MdReplay>
          </div>
        </div>
      </div>
    );
}

export default Game;
