import CardLink from '../common/CardLink';
import Card from '../common/Card';
import './options.css';

function Options() {
    return(
        <div className="container">
            <div className="game-options-container">
                    <CardLink to={"/game"} iconType={"localMultiplayer"} text={"Local Multiplayer"}/>
                    <Card iconType={"localRobot"} text={"Local vs. Robot"}/>
            </div>
        </div>
    )
}

export default Options;