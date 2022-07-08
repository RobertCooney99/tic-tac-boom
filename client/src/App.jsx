import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Game from './Game';
import Home from './Home';

function App(props) {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/game" element={<Game socket={props.socket}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;