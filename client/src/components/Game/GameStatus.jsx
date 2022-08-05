import React from 'react';
import styled from "styled-components";

const StyledStatus = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  font-size: 20px;
`;

function GameStatus({status}) {
    return(
        <StyledStatus>
          {status}
        </StyledStatus>
    );
}

export default GameStatus;