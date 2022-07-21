import React from 'react';
import {Square} from '../Game/Square';

function GameBoard(props) {
  const renderSquare = (x,y) => {
    return (
      <Square
        value={props.squares[x][y]}
        onClick={() => props.onClick(x,y)}
      />
    );
  }

  return (
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
  );
}

export default GameBoard;
