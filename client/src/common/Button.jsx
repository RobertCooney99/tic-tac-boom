import './button.css';
import { Link } from 'react-router-dom';

function Button(props) {
    return(
        <Link className="option-button" to={props.to}>{props.text.toUpperCase()}</Link>
    )
}

export default Button;