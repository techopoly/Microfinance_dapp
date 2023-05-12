import LoanCards from './Components/protocol';
import Leftbar from './Components/protocol';
import Vaultmanager from './Components/vaults';
import { Grid } from '@material-ui/core';

export default function vault() {
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
