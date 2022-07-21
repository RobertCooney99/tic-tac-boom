import React from 'react';
import './home.css';
import HomeDescription from './HomeDescription';
import HomeButtons from './HomeButtons';

function Home() {
    return (
        <div className="container">
            <HomeDescription />
            <HomeButtons />
        </div>
    )
}

export default Home;