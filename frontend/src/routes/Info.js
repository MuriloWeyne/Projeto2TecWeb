import React, { Fragment } from 'react'
import '../styles/Info.css';
import bottomcheatsheet from '../img/bottomhand.png';
import middlecheatsheet from '../img/middlehand.png';
import topcheatsheet from '../img/tophand.png';
import Grid2 from '@mui/material/Unstable_Grid2';

const middleBottomStyle = {width: 500, height: 600};
const topStyle = {width: 500, height: 600};



export default function Info() {
    return (
        <Fragment>
                    <Grid2 container spacing={0}>
                        <Grid2 item xs={4} sm={4}>
                            <img src={bottomcheatsheet} style={middleBottomStyle} alt="cheatsheet" className="cheatsheet" />
                        </Grid2>
                        <Grid2 item xs={8} sm={6}>
                            <img src={middlecheatsheet} style={middleBottomStyle} alt="cheatsheet" className="cheatsheet" />
                        </Grid2>
                        <Grid2 item xs={8} sm={6}>
                            <img src={topcheatsheet} style={topStyle} alt="cheatsheet" className="cheatsheet" />
                        </Grid2>
                    </Grid2>
        </Fragment>
    );
}
