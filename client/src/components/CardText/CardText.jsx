import styled from "styled-components";

const Text = styled.div`
    display: flex;
    @media (max-width: 768px) {
        font-size: 0.8rem;
    }
    @media (max-width: 320px) {
        font-size: 0.75rem;
    }
`;

function CardText(props) {
    return(
        <Text>{props.text}</Text>
    )
}

export default CardText;