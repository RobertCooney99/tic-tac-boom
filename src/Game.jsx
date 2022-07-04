import React from 'react';
import { useState } from 'react';
import Board from './Board';
import Player from './Player';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Game(props) {
  const playerOne = new Player('❌');
  const playerTwo = new Player('⭕️');

  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [bombInProgress, setBombInProgress] = useState(false);

  const handleClick = i => {
    // const history = history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i] || bombInProgress) {
      return;
    }

    const randomNumber = Math.floor(Math.random() * 5);
    let bomb;
    if (randomNumber === 1) {
      bomb = true;
    }

    if (!bomb) {
      squares[i] = xIsNext ? playerOne.getEmoji() : playerTwo.getEmoji();
      setHistory(history.concat([{ squares }]));
      setXIsNext(!xIsNext);
      setStepNumber(history.length);
    } else {
      squares[i] = '💣';
      setHistory(history.concat([{ squares }]));
      setXIsNext(!xIsNext);
      setStepNumber(history.length);
      setBombInProgress(true);

      setTimeout(() => {
        squares[i] = '💥';
        setHistory(history.concat([{ squares }]));
      }, 400);

      setTimeout(() => {
        const newSquares = Array(9).fill('💥');
        setHistory(history.concat([{ squares: newSquares }]));
      }, 700);

      setTimeout(() => {
        const newSquares = Array(9).fill(null);
        setHistory(history.concat([{ squares: newSquares }]));
        setBombInProgress(false);
      }, 1500);
    }
  }

    const current = history[stepNumber];
    let status;

    if (bombInProgress) {
      status = 'BOOM!';
    } else {
      const winner = calculateWinner(current.squares);
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
            <Board squares={current.squares} onClick={(i) => handleClick(i)} />
          </div>
        </div>
      </div>
    );
}

export default Game;
