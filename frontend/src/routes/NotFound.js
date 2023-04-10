import { Link } from "react-router-dom";
import "../styles/NotFound.css";

export default function NotFound() {
    return (
        <div>
            <div className="not-found-container">
                <h1>Oops! You seem to be lost.</h1>
                <p>Please click this button to return to the homepage:</p>
                <Link to='/' style={{ textDecoration: 'none' }}>Home</Link>
            </div>
        </div>
    )
}