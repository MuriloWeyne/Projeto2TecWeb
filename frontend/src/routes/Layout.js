import { Outlet } from "react-router-dom";
import GlobalStyle from "../globalStyles/globalStyles";
import '../styles/Layout.css';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InfoIcon from '@mui/icons-material/Info';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const Layout = () => {
    return (
    <>
    <GlobalStyle />

    <header className="app-header">
        <h1 className="title">Chinese Poker</h1>
        <div className="header-buttons-container">
            <IconButton>
                <Link to = '/' className="home-button"><HomeIcon sx={{ fontSize: 50, color: "white", }} /></Link>
            </IconButton>
            <IconButton>
                <Link to = '/leaderboard' className="leaderboard-button"><EmojiEventsIcon sx={{ fontSize: 50, color: "white", }} /></Link>
            </IconButton>
            <IconButton>
                <Link to = '/active-games' className="active-games-button"><SportsEsportsIcon sx={{ fontSize: 50, color: "white", }} /></Link>
            </IconButton>
            <IconButton>
                <Link to = '/info' className="help-button"><InfoIcon sx={{ fontSize: 50, color: "white", }} /></Link>
            </IconButton>
        </div>
    </header>
    <Outlet />
    </>   
    );
}

export default Layout;