import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import GameControl from './GameControl';

const StyledCounter = styled.span`
    position: absolute;
    background-color: #222;
    color: #fff;
    font-size: 10px;
    border-radius: 100px;
    width: 16px;
    height: 16px;
    justify-content: center;
    align-items: center;
    display: inline-flex;

    @media (max-width: 768px) {
      width: 14px;
      height: 14px;
    }
    @media (max-width: 320px) {
      width: 12px;
      height: 12px;
      font-size: 8px;
    }
`;

function GameControlCounter({iconType, onClick, link, to, count}) {
  const control =
    <>
      <div>
        <GameControl iconType={iconType} onClick={onClick}/>
        {count !== 0 && <StyledCounter>{count}</StyledCounter>}
      </div>
    </>

  return(
    <>
      {link ? <Link to={to}> {control} </Link> : control}
    </>
  );
}

export default GameControlCounter;