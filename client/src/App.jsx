import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Options from './components/Options';
import Header from './components/Header';
import './app.css';
import LocalGame from './components/Game/LocalGame';
import SoloGame from './components/Game/SoloGame';

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
              <Route path="/game" element={<LocalGame socket={props.socket}/>}/>
              <Route path="/solo" element={<SoloGame socket={props.socket}/>}/>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;