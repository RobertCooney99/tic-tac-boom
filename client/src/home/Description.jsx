import './description.css';
import Card from './Card';

function Description() {


    return(
        <div className="game-description-container">
            <Card iconType={"game"} text={"Tic-tac-toe..."}/>
            <Card iconType={"bomb"} text={"...but with bombs..."}/>
            <Card iconType={"stars"} text={"...and much, much more."}/>
        </div>
    )
}

export default Description;