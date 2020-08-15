import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '25vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      width:'200px',
      height:'162px',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    heading:{
        paddingLeft:"490px",
        color:'white'

    }
    
    
  }));
const UpperFooter = () => {
    const classes=useStyles()
    return ( 

        <Grid container component="main" className={classes.root}>
        <CssBaseline />

        <Grid item xs={false} sm={12} md={12} className={classes.image} >   
         <h1 className={classes.heading}>Digital Ecomrce Store</h1> </Grid>
    
        
        </Grid>
     );
}
 
export default UpperFooter;