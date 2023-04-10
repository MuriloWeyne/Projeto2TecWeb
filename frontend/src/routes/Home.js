import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../styles/Home.css';
import GlobalStyle from '../globalStyles/globalStyles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GroupIcon from '@mui/icons-material/Group';
import ButtonGroup from '@mui/material/ButtonGroup';
   
const buttonStyle = {
    margin: '10px',
    borderRadius: '0px',
    width: '200px',
}

function Home() {
  return (
    <Fragment>
        <GlobalStyle />
        <>
            <div className="App">
                    <ButtonGroup disableElevation variant="contained" aria-label="vertical button group" orientation="vertical">
                    <Link to ='/create-game' style={{ textDecoration: 'none' }}><Button sx={buttonStyle} endIcon={<AddCircleOutlineIcon />}>Create Game</Button></Link>
    <Link to = '/join-game' style={{ textDecoration: 'none' }}><Button sx={buttonStyle} endIcon={<GroupIcon />}>Join Game</Button></Link>
                    </ButtonGroup>
            </div>
        </>
    </Fragment>
    );
}

export default Home;