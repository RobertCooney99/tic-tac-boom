import Button from '../common/Button';

function HomeButtons() {
    return(
        <div className="option-button-container">
            <Button text="Start Game" to="/settings"/>
        </div>
    );
}

export default HomeButtons;