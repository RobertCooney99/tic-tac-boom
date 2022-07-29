import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import io from "socket.io-client";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
