import { FaGamepad, FaBomb } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import './card.css';

const icons = {
    game: FaGamepad,
    bomb: FaBomb,
    stars: BsStars
};

function CardIcon(props) {
    const Icon = icons[props.iconType];

    return(
        <Icon className="game-description-card-icon" size={50} color={"#222"}/>
    )
}

export default CardIcon;