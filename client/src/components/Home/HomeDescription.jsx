import Card from '../Card';
import styled from "styled-components";

const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

function HomeDescription() {
    return(
        <DescriptionContainer>
            <Card iconType={"game"} text={"Tic-tac-toe..."}/>
            <Card iconType={"bomb"} text={"...but with bombs..."}/>
            <Card iconType={"stars"} text={"...and much, much more."}/>
        </DescriptionContainer>
    )
}

export default HomeDescription;