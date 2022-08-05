import styled from "styled-components";
import CardIcon from '../CardIcon';
import CardText from '../CardText';
import { Link } from 'react-router-dom';

const CardContainer = styled(Link)`
    background-color: #EEE;
    border-radius: 8px;
    padding: 5px;
    flex: 1 1 0;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 200px;
    margin-left: 15px;
    margin-right: 15px;
    transition: background-color 1s ease;
    text-decoration: none;
    color: #222;

    &:hover {
        background-color: #DDD;
    }

    @media (max-width: 768px) {
        width: 150px;
        height: 100%;
        margin: 10px 0px;
        padding: 15px;
    }
`;

function CardLink(props) {
    return(
        <CardContainer to={props.to}>
            <CardIcon iconType={props.iconType} />
            <CardText text={props.text} />
        </CardContainer>
    )
}

export default CardLink;