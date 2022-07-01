import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Game } from './Game';

// function Square(props) {
//     return (
//         <button
//         className="square"
//         onClick={props.onClick}>
//           {props.value}
//         </button>
//     );
// }

// class Board extends React.Component {
//     renderSquare(i) {
//       return <Square value={this.props.squares[i]}
//       onClick={() => this.props.onClick(i)}/>;
//     }

//     render() {
//       return (
//         <div>
//           <div className="board-row">
//             {this.renderSquare(0)}
//             {this.renderSquare(1)}
//             {this.renderSquare(2)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(3)}
//             {this.renderSquare(4)}
//             {this.renderSquare(5)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(6)}
//             {this.renderSquare(7)}
//             {this.renderSquare(8)}
//           </div>
//         </div>
//       );
//     }
// }
//   class Game extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             history: [{squares: Array(9).fill(null)}],
//             stepNumber: 0,
//             xIsNext: true,
//             bombInProgress: false
//         }
//     }

//     handleClick(i) {
//         const history = this.state.history.slice(0, this.state.stepNumber + 1);
//         const current = history[history.length - 1];
//         const squares = current.squares.slice();
//         if (calculateWinner(squares) || squares[i] || this.state.bombInProgress) {
//             return;
//         }

//         const randomNumber = Math.floor(Math.random() * 5);
//         let bomb;
//         if (randomNumber === 1) {
//             bomb = true;
//         }

//         if (!bomb) {
//             squares[i] = this.state.xIsNext ? '❌' : '⭕️';
//             this.setState({
//                 history: history.concat([{squares: squares}]),
//             xIsNext: !this.state.xIsNext,
//             stepNumber: history.length});
//         } else {
//             squares[i] = '💣';
//             this.setState({
//                 history: history.concat([{squares: squares}]),
//             xIsNext: !this.state.xIsNext,
//             stepNumber: history.length,
//             bombInProgress: true});

//             setTimeout(() => {
//                 squares[i] = '💥';
//                 this.setState({history: history.concat([{squares: squares}])});
//              }, 400)

//              setTimeout(() => {
//                 let newSquares = Array(9).fill('💥');
//                 this.setState({history: history.concat([{squares: newSquares}])});
//              }, 800);

//             setTimeout(() => {
//                 let newSquares = Array(9).fill(null);
//                 this.setState({history: history.concat([{squares: newSquares}])});
//                 this.setState({bombInProgress: false});
//              }, 1500);
//         }
//     }

//     resetGame() {
//         const history = this.state.history.slice(0, this.state.stepNumber + 1);
//     }

//     jumpTo(step) {
//         this.setState({
//             stepNumber: step,
//             xIsNext: (step % 2) === 0
//     });
//     }

//     render() {
//         const history = this.state.history;
//         const current = history[this.state.stepNumber];
//         let status;

//         if (this.state.bombInProgress) {
//             status = 'BOOM!'
//         } else {
//             const winner = calculateWinner(current.squares);
//             if (winner) {
//                 status = winner + ' wins!';
//             } else {
//                 status = 'Player ' + (this.state.xIsNext ? '❌' : '⭕️') + '\'s turn...';
//             }
//         }
//       return (
//         <div className="container">
//             <header>TIC TAC BOOM</header>
//         <div className="game">
//                       <div className="game-info">
//             <div>{status}</div>
//           </div>
//           <div className="game-board">
//             <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
//           </div>
//         </div>
//         </div>
//       );
//     }
//   }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);
