import React from 'react';
import './home.css';
import { FaGamepad, FaBomb } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import Button from './common/Button';

function Home() {
    return (
        <div className="container">
            <div className="game-description-container">
                <div className="game-description-card">
                    <div className="game-description-card-icon"><FaGamepad size={50} color={"#222"}></FaGamepad></div>
                    <div className="game-description-card-text">Tic-tac-toe...</div>
                </div>
                <div className="game-description-card">
                    <div className="game-description-card-icon"><FaBomb size={50} color={"#222"}></FaBomb></div>
                    <div className="game-description-card-text">...but with bombs...</div>
                </div>
                <div className="game-description-card">
                    <div className="game-description-card-icon"><BsStars size={50} color={"#222"}></BsStars></div>
                    <div className="game-description-card-text">...and much, much more.</div>
                </div>
            </div>
            <div className="option-button-container">
                <Button text="Start Game" to="/game"/>
            </div>
        </div>
    )
}

export default Home;