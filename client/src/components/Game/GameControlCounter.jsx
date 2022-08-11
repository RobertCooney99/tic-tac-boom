import React from 'react';
import { MdHome, MdReplay, MdShare } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const StyledIcon = styled.div`
  width: 50px;
  height: 50px;

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }
  @media (max-width: 320px) {
    width: 40px;
    height: 40px;
  }
`;

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
`;

const icons = {
  home: MdHome,
  reset: MdReplay,
  share: MdShare,

};

function GameControlCounter({iconType, onClick, link, to, count}) {
  const Icon = icons[iconType];
  
  const control =
    <>
      <div>
        <StyledIcon as={Icon} color={"#222"} onClick={onClick}/>
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