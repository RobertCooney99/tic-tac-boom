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

const icons = {
  home: MdHome,
  reset: MdReplay,
  share: MdShare,

};

function GameControl({iconType, onClick, link, to}) {
  const Icon = icons[iconType];

  const control = <StyledIcon as={Icon} color={"#222"} onClick={onClick} />;

  return(
    <>
      {link ? <Link to={to}> {control} </Link> : control}
    </>
  );
}

export default GameControl;