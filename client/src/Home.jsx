import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="homeContainer">
            <Link to="/game">Game</Link>
        </div>
    )
}

export default Home;