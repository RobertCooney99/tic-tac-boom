import React from 'react';
import styled from "styled-components";

const StyledStatus = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  font-size: 20px;

  @media (max-width: 768px) {
    margin: 15px;
    font-size: 16px;
  }
  @media (max-width: 320px) {
    margin: 10px;
    font-size: 14px;
  }
`;

function GameStatus({status}) {
    return(
        <StyledStatus>
          {status}
        </StyledStatus>
    );
}

export default GameStatus;