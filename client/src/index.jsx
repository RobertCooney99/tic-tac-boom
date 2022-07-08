import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './Game';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);
