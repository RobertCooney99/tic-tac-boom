import React from 'react';
import Square from '../GameSquare';

function GameBoard({squares, onClick, gameActive = true}) {
  const renderSquare = (x,y) => {
    return (
      <Square
        value={squares[x][y]}
        onClick={() => onClick(x,y)}
        className={`square ${gameActive ? 'active' : 'inactive'}`}
      />
    );
  }

  return (
      <div className={`game-board ${gameActive ? '' : 'inactive-game'}`}>
        <div>
          <div className="board-row">
            {renderSquare(0,0)}
            {renderSquare(0,1)}
            {renderSquare(0,2)}
          </div>
          <div className="board-row">
            {renderSquare(1,0)}
            {renderSquare(1,1)}
            {renderSquare(1,2)}
          </div>
          <div className="board-row">
            {renderSquare(2,0)}
            {renderSquare(2,1)}
            {renderSquare(2,2)}
          </div>
        </div>
      </div>
  );
}

export default GameBoard;
