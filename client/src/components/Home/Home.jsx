import React from 'react';
import styled from "styled-components";
import HomeDescription from './HomeDescription';
import HomeButtons from './HomeButtons';

const Container = styled.div`
    justify-content: flex-start;
`;

function Home() {
    return (
        <Container>
            <HomeDescription />
            <HomeButtons />
        </Container>
    )
}

export default Home;