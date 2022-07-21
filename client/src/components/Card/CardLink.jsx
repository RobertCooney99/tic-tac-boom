import './card.css';
import CardIcon from './CardIcon';
import CardText from './CardText';
import { Link } from 'react-router-dom';

function CardLink(props) {
    return(
        <Link to={props.to} className="game-description-card">
            <CardIcon iconType={props.iconType} />
            <CardText text={props.text} />
        </Link>
    )
}

export default CardLink;