import './card.css';
import CardIcon from './CardIcon';
import CardText from './CardText';

function Card(props) {
    return(
        <div className="game-description-card">
            <CardIcon iconType={props.iconType} />
            <CardText text={props.text} />
        </div>
    )
}

export default Card;