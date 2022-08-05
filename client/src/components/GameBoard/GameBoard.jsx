import React from 'react';
import styled from "styled-components";
import Square from '../GameSquare';

const StyledBoard = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledRow = styled.div`
`;

function GameBoard({squares, onClick, gameActive}) {
  const renderSquare = (x,y) => {
    return (
      <Square
        value={squares[x][y]}
        onClick={() => onClick(x,y)}
        active={true}
      />
    );
  }

  return (
      <StyledBoard>
          <StyledRow>
            {renderSquare(0,0)}
            {renderSquare(0,1)}
            {renderSquare(0,2)}
          </StyledRow>
          <StyledRow>
            {renderSquare(1,0)}
            {renderSquare(1,1)}
            {renderSquare(1,2)}
          </StyledRow>
          <StyledRow>
            {renderSquare(2,0)}
            {renderSquare(2,1)}
            {renderSquare(2,2)}
          </StyledRow>
      </StyledBoard>
  );
}

export default GameBoard;
