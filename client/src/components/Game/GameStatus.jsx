import React from 'react';

function GameStatus({status}) {
    return(
        <div className="game-info">
          {status}
        </div>
    );
}

export default GameStatus;