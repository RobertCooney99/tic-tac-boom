import CardIcon from '../CardIcon';
import CardText from '../CardText';
import styled from "styled-components";

const CardContainer = styled.div`
    background-color: #EEE;
    border-radius: 8px;
    padding: 5px;
    flex: 1 1 0;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 250px;
    margin-left: 15px;
    margin-right: 15px;
    transition: background-color 1s ease;
    text-decoration: none;
    color: #222;

    &:hover {
        background-color: #DDD;
    }
`;

function Card(props) {
    return(
        <CardContainer>
            <CardIcon iconType={props.iconType} />
            <CardText text={props.text} />
        </CardContainer>
    )
}

export default Card;