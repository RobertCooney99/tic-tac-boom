import React from 'react';
import './home.css';
import Button from '../common/Button';
import Description from './HomeDescription';

function Home() {
    return (
        <div className="container">
            <Description />
            <div className="option-button-container">
                <Button text="Start Game" to="/game"/>
            </div>
        </div>
    )
}

export default Home;