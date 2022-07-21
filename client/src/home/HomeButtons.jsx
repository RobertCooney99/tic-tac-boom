import Button from '../components/Button/Button';

function HomeButtons() {
    return(
        <div className="option-button-container">
            <Button text="Start Game" to="/options"/>
        </div>
    );
}

export default HomeButtons;