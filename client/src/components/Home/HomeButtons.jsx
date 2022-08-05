import styled from "styled-components";
import Button from '../Button';

const Container = styled.div`
    display: flex;
    margin-top: 30px;
    justify-content: center;
`;

function HomeButtons() {
    return(
        <Container>
            <Button text="Start Game" to="/options"/>
        </Container>
    );
}

export default HomeButtons;