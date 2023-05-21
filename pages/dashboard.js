import LoanCards from './Components/protocol';
import Leftbar from './Components/protocol';
import Approve from './Components/approve';
import { Grid } from '@material-ui/core';

import {
  CircularProgress,
} from '@mui/material';

import React, { useState,useEffect } from 'react';


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('logged_in') !== 'true') {
        window.location.href = '/login'; // replace 'login' with your login page path
    }else{
      setIsLoggedIn(true);
    }
}, []);
  return (
    <div>
    {isLoggedIn 
      ? <LoggedInComponent /> 
      : <CircularProgress size={24}  /> 
    }
  </div>
  );
}
function LoggedInComponent() {
  return <h1> <Grid container>
  <Grid item xs={2}>
    <item><Leftbar/></item>
  </Grid>
  <Grid  item xs={10} >
  <item><Approve/></item>
  </Grid>
</Grid></h1>;
}