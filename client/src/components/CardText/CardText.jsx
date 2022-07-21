import './cardtext.css';

function CardText(props) {
    return(
        <div className="game-description-card-text">{props.text}</div>
    )
}

export default CardText;