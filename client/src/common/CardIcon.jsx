import { FaGamepad, FaBomb } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import { MdPeopleOutline } from 'react-icons/md';
import { AiOutlineRobot } from 'react-icons/ai';
import './card.css';

const icons = {
    game: FaGamepad,
    bomb: FaBomb,
    stars: BsStars,
    localMultiplayer: MdPeopleOutline,
    localRobot: AiOutlineRobot
};

function CardIcon(props) {
    const Icon = icons[props.iconType];

    return(
        <Icon className="game-description-card-icon" size={50} color={"#222"}/>
    )
}

export default CardIcon;