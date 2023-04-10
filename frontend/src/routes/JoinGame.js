import React, { Fragment, useState } from 'react'
import GlobalStyle from '../globalStyles/globalStyles';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import '../styles/JoinGame.css';

const buttonStyle = {
    margin: '10px',
    borderRadius: '0px',
    width: '200px',
}

const textFieldStyle = {
    margin: '10px',
    borderRadius: '0px',
    width: '200px',
}

const defaultValues = {
    name: '',
    gameID: '',
}

export default function JoinGame() {
    const formValues = useState(defaultValues);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
        axios.post('http://localhost:8000/api/games/join/' + formValues.gameID, {
            "player": formValues.name,
        })
        .then((response) => {
            console.log(response);
            window.location.replace("/game/" + response.data.id + '/' + formValues.name);
        }
        )
        .catch((error) => {
            console.log(error);
        }
        );
    }

    return (
        <Fragment>
            <GlobalStyle />
            <div className='joinGame'>
                    <form className="join-form" onSubmit={handleSubmit}>
                        <TextField
                            id="name"
                            label="Username"
                            variant="outlined"
                            type="text"
                            value={formValues.name}
                            onChange={(event) => formValues.name = event.target.value}
                            sx = {textFieldStyle}
                        />
                        <TextField
                            id="gameId"
                            label="Game ID"
                            variant="outlined"
                            type="text"
                            value={formValues.gameID}
                            onChange={(event) => formValues.gameID = event.target.value}
                            sx = {textFieldStyle}
                        />
                        <Button sx={buttonStyle} type="submit" variant='contained'>Join</Button>
                    </form>
            </div>
        </Fragment>
    );
}