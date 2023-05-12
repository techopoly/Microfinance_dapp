import LoanCards from './Components/protocol';
import Leftbar from './Components/protocol';
import Approve from './Components/approve';
import { Grid } from '@material-ui/core';

export default function Home() {
  return (
    <Grid container>
    <Grid item xs={2}>
      <item><Leftbar/></item>
    </Grid>
    <Grid  item xs={10} >
    <item><Approve/></item>
    </Grid>
  </Grid>
  );
}
