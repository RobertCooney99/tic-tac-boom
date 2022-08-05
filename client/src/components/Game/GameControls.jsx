import React from 'react';
import styled from "styled-components";

const ControlsContainer = styled.div`
  width: 100%;
  display: flex;
  padding-top: 35px;
  justify-content: space-around;
  flex-direction: row;
  align-content: center;
`;

function GameControls({children}) {
    return(
        <ControlsContainer>
          {children}
        </ControlsContainer>
    );
}

export default GameControls;