import LoanCards from './Components/protocol';
import Leftbar from './Components/protocol';
import Vaultmanager from './Components/vaults';
import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
export default function vault() {

  useEffect(() => {
    if(localStorage.getItem('logged_in') !== 'true') {
        window.location.href = '/login'; // replace 'login' with your login page path
    }
}, []);
  return (

    <Grid container>
    <Grid item xs={2}>
      <item><Leftbar/></item>
    </Grid>
    <Grid  item xs={10} >
    <item><Vaultmanager/></item>
    </Grid>
  </Grid>

  );
}
