import { FaGamepad, FaBomb } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import { MdPeopleOutline } from 'react-icons/md';
import { AiOutlineRobot } from 'react-icons/ai';
import styled from "styled-components";

const icons = {
    game: FaGamepad,
    bomb: FaBomb,
    stars: BsStars,
    localMultiplayer: MdPeopleOutline,
    localRobot: AiOutlineRobot
};

const Icon = styled.div`
    display: flex;
    margin-bottom: 32px;
    height: 50px;
    width: 50px;
    @media (max-width: 768px) {
        height: 40px;
        width: 40px;
        margin-bottom: 16px;
    }
    @media (max-width: 320px) {
        margin-bottom: 10px;
        height: 25px;
        width: 25px;
    }
`;

function CardIcon(props) {
    const IconType = icons[props.iconType];

    return(
        <Icon as={IconType} className="game-description-card-icon" color={"#222"}/>
    )
}

export default CardIcon;