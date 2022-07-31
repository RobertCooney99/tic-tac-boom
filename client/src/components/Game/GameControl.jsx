import React from 'react';
import { MdHome, MdReplay, MdShare } from 'react-icons/md';
import { Link } from 'react-router-dom';

const icons = {
  home: MdHome,
  reset: MdReplay,
  share: MdShare,

};

function GameControl({iconType, onClick, link, to}) {
  const Icon = icons[iconType];

  const control = <Icon size={50} color={"#222"} onClick={onClick} />;

  return(
    <>
      {link ? <Link to={to}> {control} </Link> : control}
    </>
  );
}

export default GameControl;