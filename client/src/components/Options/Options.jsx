import CardLink from '../CardLink';
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

function Options() {
    return(
        <Container>
            <CardLink to={"/game"} iconType={"localMultiplayer"} text={"Local Multiplayer"}/>
            <CardLink to={"/solo"} iconType={"localRobot"} text={"Local vs. Robot"}/>
            <CardLink to={"/online/test"} iconType={"stars"} text={"Online Multiplayer"}/>
        </Container>
    )
}

export default Options;