import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import io from "socket.io-client";
import App from './App';

const socket = io.connect("http://localhost:3001");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App socket={socket}/>);
