import LoanCards from './Components/protocol';
import Leftbar from './Components/protocol';
import Groupvaults from './Components/groupvault';
import { Grid } from '@material-ui/core';

export default function groupadmin() {
  return (

    <Grid container>
    <Grid item xs={2}>
      <item><Leftbar/></item>
    </Grid>
    <Grid  item xs={10} >
    <item><Groupvaults/></item>
    </Grid>
  </Grid>

  );
}
