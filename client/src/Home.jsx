import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import { FaGamepad, FaBomb } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';

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
                <Link className="option-button" to="/game">START GAME</Link>
            </div>
        </div>
    )
}

export default Home;