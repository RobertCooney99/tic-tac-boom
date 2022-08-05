import styled from "styled-components";
import { Link } from 'react-router-dom';

const StyledButton = styled(Link)`
    background-color: #222;
    color: #FFF;
    text-decoration: none;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 30px;
    padding-right: 30px;
    border-radius: 8px;
    transition: background-color 1s ease;

    &:hover {
        background-color: #444;
    }

    @media (max-width: 768px) {
        font-size: 0.8rem;
    }
`;

function Button(props) {
    return(
        <StyledButton to={props.to}>{props.text.toUpperCase()}</StyledButton>
    )
}

export default Button;