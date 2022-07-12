import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Game from './Game';
import Home from './Home';
import Header from './Header';

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
              <Route path="/game" element={<Game socket={props.socket}/>}/>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;