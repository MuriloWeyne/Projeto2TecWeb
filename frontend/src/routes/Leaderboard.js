import React, { Fragment, useEffect, useState } from 'react'
import GlobalStyle from '../globalStyles/globalStyles';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/leaderboard')
            .then(res => {
                setLeaderboard(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    
        
    return (
        <Fragment>
            <GlobalStyle />
            <div className="Leaderboard">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {leaderboard.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="right">{row.player.name}</TableCell>
                                        <TableCell align="right">{row.score}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            </div>
        </Fragment>
    );
}

export default Leaderboard;