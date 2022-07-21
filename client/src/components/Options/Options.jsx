import CardLink from '../Card/CardLink';
import Card from '../Card/Card';
import './options.css';

function Options() {
    return(
        <div className="container">
            <div className="game-options-container">
                    <CardLink to={"/game"} iconType={"localMultiplayer"} text={"Local Multiplayer"}/>
                    <CardLink to={"/solo"} iconType={"localRobot"} text={"Local vs. Robot"}/>
                    <Card iconType={"stars"} text={"Online Multiplayer"}/>
            </div>
        </div>
    )
}

export default Options;