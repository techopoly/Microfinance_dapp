import LoanCards from './Components/protocol';
import Leftbar from './Components/protocol';
import Verifymembers from './Components/verifyMembers';
import { Grid } from '@material-ui/core';

export default function verification() {
  return (

    <Grid container>
    <Grid item xs={2}>
      <item><Leftbar/></item>
    </Grid>
    <Grid  item xs={10} >
    <item><Verifymembers/></item>
    </Grid>
  </Grid>

  );
}
