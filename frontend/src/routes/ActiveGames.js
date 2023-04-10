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


export default function ActiveGames() {
    const [activeGames, setActiveGames] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/games')
            .then(res => {
                setActiveGames(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
            return (
            <Fragment>
                <GlobalStyle />
                <div className="ActiveGames">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Game ID</TableCell>
                                        <TableCell>Current Round</TableCell>
                                        <TableCell align="right">Player 1 Name</TableCell>
                                        <TableCell align="right">Player 1 Score</TableCell>
                                        <TableCell align="right">Player 2 Name</TableCell>
                                        <TableCell align="right">Player 2 Score</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {activeGames.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="left">{row.game_round}</TableCell>
                                            <TableCell align="right">{row.player1.name}</TableCell>
                                            <TableCell align="right">{row.p1_score}</TableCell>
                                            <TableCell align="right">{row.player2?.name ?? ""}</TableCell>
                                            <TableCell align="right">{row.p2_score}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                </div>
        </Fragment>
            )
}