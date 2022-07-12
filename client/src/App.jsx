import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Game from './Game';
import Home from './Home';
import Header from './Header';

function App(props) {
  return (
    <div className="wrapper">
      <Header/>
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