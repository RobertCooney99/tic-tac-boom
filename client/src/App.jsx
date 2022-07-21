import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from './game/Game';
import GameRobot from './game/GameRobot';
import Home from './components/Home/Home';
import Options from './components/Options/Options';
import Header from './components/Header/Header';
import './app.css';

function App(props) {
  return (
    <div className="page-container">
      <div className="header-container">
        <Header/>
      </div>
      <div className="body-container">
        <div className="body-container-content">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/options" element={<Options/>}/>
              <Route path="/game" element={<Game socket={props.socket}/>}/>
              <Route path="/solo" element={<GameRobot socket={props.socket}/>}/>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;