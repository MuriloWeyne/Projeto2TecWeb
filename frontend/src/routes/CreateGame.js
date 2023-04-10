import React, { Fragment, useState } from 'react'
import GlobalStyle from '../globalStyles/globalStyles';
import { Button, TextField } from '@mui/material';
import '../styles/CreateGame.css';
import axios from 'axios';

    
const defaultValues = {
    name: '',
}

const buttonStyle = {
    margin: '10px',
    borderRadius: '0px',
    width: '200px',
}

function CreateGame() {

    const formValues = useState(defaultValues);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/games', {
            "player": formValues.name,
        })
        .then((response) => {
            console.log(response);
            window.location.replace("/game/" + response.data.id + '/' + response.data.player1.name);
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
            <div className='createGame'>
                    <form className="create-form" onSubmit={handleSubmit}>
                        <TextField
                            id="name"
                            label="Username"
                            variant="outlined"
                            type="text"
                            value={formValues.name}
                            onChange={(event) => formValues.name = event.target.value}
                        />
                        <Button sx={buttonStyle} type="submit" variant='contained'>Create</Button>
                    </form>
            </div>
        </Fragment>
        );
    }
export default CreateGame;