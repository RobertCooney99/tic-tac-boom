import styled from "styled-components";

const StyledHeader = styled.header`
    width: 100%;
    padding-top: 30px;
    padding-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #222;
    color: #fff;
    font-size: 35px;
    font-weight: 800;
    flex-shrink: 1;
    text-decoration: none;

    @media (max-width: 768px) {
        font-size: 30px;
    }
    @media (max-width: 320px) {
        font-size: 25px;
    }
`;

function Header() {
    return(
        <StyledHeader>TIC TAC BOOM</StyledHeader>
    )
}

export default Header;