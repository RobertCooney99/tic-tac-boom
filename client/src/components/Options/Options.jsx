import CardLink from '../CardLink';
import Card from '../Card';
import './options.css';

function Options() {
    return(
        <div className="container">
            <div className="game-options-container">
                    <CardLink to={"/game"} iconType={"localMultiplayer"} text={"Local Multiplayer"}/>
                    <CardLink to={"/solo"} iconType={"localRobot"} text={"Local vs. Robot"}/>
                    <CardLink to={"/online/test"} iconType={"stars"} text={"Online Multiplayer"}/>
            </div>
        </div>
    )
}

export default Options;