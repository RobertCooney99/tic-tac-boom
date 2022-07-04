import React from 'react';
import { useState } from 'react';
import Board from './Board';
import Player from './Player';

function calculateWinner(squares) {
  //TODO: Calculate winner handling
  return null;
}

function Game(props) {
  const playerOne = new Player('❌');
  const playerTwo = new Player('⭕️');

  const [board, setBoard] = useState([[null, null, null], [null, null, null], [null, null, null]]);
  const [xIsNext, setXIsNext] = useState(true);
  const [bombInProgress, setBombInProgress] = useState(false);

  const plantBomb = (x,y) => {
    placeBombOnBoard(x,y);
    explodeBomb(x,y);
    spreadBombToSurroundingArea(x,y);
    spreadBombToWholeBoard();
    clearBoardFromExplosion();
  }

  const placeBombOnBoard = (x,y) => {
    const current = board.map((x) => x);
    current[x][y] = '💣';
    setBoard(current);
    setXIsNext(!xIsNext);
    setBombInProgress(true);
  }

  const explodeBomb = (x,y) => {
    setTimeout(() => {
      let newSquares = board.map((x) => x);
      newSquares[x][y] = '💥';
      setBoard(newSquares);
    }, 600);
  }

  const spreadBombToSurroundingArea = (x,y) => {
    const surroundingCoordinates = calculateSurroundingCoordinates(x,y);
    console.log(surroundingCoordinates);
    setTimeout(() => {
      const newSquares = board.map((x) => x);
      for (let coordinates of surroundingCoordinates) {
        console.log(coordinates[0] + ' : ' + coordinates[1]);
        newSquares[coordinates[0]][coordinates[1]] = '💥';
      }
      console.log(newSquares);
      setBoard(newSquares);
    }, 850);
  }

  const spreadBombToWholeBoard = () => {
    setTimeout(() => {
      const newSquares = [...new Array(3)].map(()=> [...new Array(3)].map(()=> '💥'));
      setBoard(newSquares);
    }, 1050);
  }

  const clearBoardFromExplosion = () => {
    setTimeout(() => {
      const newSquares = [...new Array(3)].map(()=> [...new Array(3)].map(()=> null));
      setBoard(newSquares);
      setBombInProgress(false);
    }, 1350);
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
      plantBomb(x,y);
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
        </div>
      </div>
    );
}

export default Game;
