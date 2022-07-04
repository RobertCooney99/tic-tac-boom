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

  const handleClick = (x,y) => {
    console.log("Handling click at: " + x + "," + y);
    const current = board.map((x) => x);

    if (calculateWinner(board) || board[x][y] || bombInProgress) {
      return;
    }

    const randomNumber = Math.floor(Math.random() * 5);
    let bomb;
    if (randomNumber === 1) {
      bomb = true;
    }

    if (!bomb) {
      current[x][y] = xIsNext ? playerOne.getEmoji() : playerTwo.getEmoji();
      setBoard(current);
      setXIsNext(!xIsNext);
    } else {
      current[x][y] = '💣';
      setBoard(current);
      setXIsNext(!xIsNext);
      setBombInProgress(true);

      setTimeout(() => {
        let newSquares = board.map((x) => x);
        newSquares[x][y] = '💥';
        setBoard(newSquares);
      }, 400);

      setTimeout(() => {
        const newSquares = [...new Array(3)].map(()=> [...new Array(3)].map(()=> '💥'));
        setBoard(newSquares);
      }, 750);

      setTimeout(() => {
        const newSquares = [...new Array(3)].map(()=> [...new Array(3)].map(()=> null));
        setBoard(newSquares);
        setBombInProgress(false);
      }, 1400);
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
