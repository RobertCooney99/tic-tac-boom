import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Options from './components/Options';
import Header from './components/Header';
import LocalGame from './components/Game/LocalGame';
import SoloGame from './components/Game/SoloGame';
import OnlineGame from './components/Game/OnlineGame';
import styled, {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font: 14px "Century Gothic", Futura, sans-serif;
    margin: 0px;
  }
`

const Page = styled.div`
  display: flex;
  min-height: 100vh;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Body = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const BodyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  padding-bottom: 50px;
`;

function App(props) {
  return (
    <React.Fragment>
      <Page>
        <Header/>
        <Body>
          <BodyContent>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/options" element={<Options/>}/>
                <Route path="/game" element={<LocalGame socket={props.socket}/>}/>
                <Route path="/solo" element={<SoloGame socket={props.socket}/>}/>
                <Route path="/online/:id" element={<OnlineGame socket={props.socket}/>}/>
              </Routes>
            </BrowserRouter>
          </BodyContent>
        </Body>
      </Page>
      <GlobalStyle />
    </React.Fragment>
  );
}

export default App;