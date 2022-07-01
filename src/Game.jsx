import React from 'react';
import { Board } from './Board';

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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      xIsNext: true,
      bombInProgress: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i] || this.state.bombInProgress) {
      return;
    }

    const randomNumber = Math.floor(Math.random() * 5);
    let bomb;
    if (randomNumber === 1) {
      bomb = true;
    }

    if (!bomb) {
      squares[i] = this.state.xIsNext ? '❌' : '⭕️';
      this.setState({
        history: history.concat([{ squares }]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,
      });
    } else {
      squares[i] = '💣';
      this.setState({
        history: history.concat([{ squares }]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,
        bombInProgress: true,
      });

      setTimeout(() => {
        squares[i] = '💥';
        this.setState({ history: history.concat([{ squares }]) });
      }, 400);

      setTimeout(() => {
        const newSquares = Array(9).fill('💥');
        this.setState({ history: history.concat([{ squares: newSquares }]) });
      }, 800);

      setTimeout(() => {
        const newSquares = Array(9).fill(null);
        this.setState({ history: history.concat([{ squares: newSquares }]) });
        this.setState({ bombInProgress: false });
      }, 1500);
    }
  }

  render() {
    const { history } = this.state;
    const current = history[this.state.stepNumber];
    let status;

    if (this.state.bombInProgress) {
      status = 'BOOM!';
    } else {
      const winner = calculateWinner(current.squares);
      if (winner) {
        status = `${winner} wins!`;
      } else {
        status = `Player ${this.state.xIsNext ? '❌' : '⭕️'}'s turn...`;
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
            <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
          </div>
        </div>
      </div>
    );
  }
}

export { Game };
