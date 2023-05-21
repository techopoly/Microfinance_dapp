import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@mui/material';
import { styled } from '@mui/system';
import Header from "./appbar";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import useMifiApi from "./hooks/useMifiApi";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';
import styles from '../styles/login.module.css';
////////////////////////////////////////////////Take loan///////////////////////////////
const LogoTypography = styled(Typography)({
    flexGrow: 1,
  });

export default function BorrowerPage() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [installments, setInstallments] = useState(5);
  const [eachInstallmentAmount, setEachInstallmentAmount] = useState(0);
  const [eachTerm, setEachTerm] = useState(30);
  const { web3, account, contract } = useMifiApi();
  const [allVaults, setAllVaults] = useState([]);
  const [vaultId, setVaultId] = useState();
  const [allGroupVault, setAllGroupVault] = useState([]);
  const [vaultType, setVaultType] = useState([]);

  
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleClickOpen = (vault_id, vaultType) => {
    setVaultId(vault_id);
    setVaultType(vaultType);
    setOpen(true);
  };

  const handleClose = () => {
    individualBorrow();
    setOpen(false);
  };

  useEffect(() => {
    calculateEachInstallmentAmount();
  }, [amount, installments]);

  const calculateEachInstallmentAmount = () => {
    if (installments > 0) {
      setEachInstallmentAmount(amount / installments);
    }
  }

  const installmentOptions = [5, 10, 15, 20];
  const termOptions = [30, 60];



  useEffect(() => {
    const getAllIndividualVault = async () => {
      try {
        console.log("Watch Hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        console.log(contract);
        if (contract) {
          const vaults = await contract.methods
            .show_all_individual_vault()
            .call({ from: account[0] });
          console.log("vaults: ", vaults);
          setAllVaults(vaults);
          getAllLoans();
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getAllGroupVault = async () => {
      try {
        if (contract) {
          const vaults = await contract.methods
            .show_all_group_vault()
            .call({ from: account[0] });
          console.log("vaults: ", vaults);
          setAllGroupVault(vaults);
          // getAllLoans();
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllIndividualVault();
    getAllGroupVault();
  }, [contract]);

  const getAllLoans = async () => {
    try {
      if (contract) {
        const allLoans = await contract.methods
          .show_all_loan()
          .call({ from: account[0]});
        console.log("allLoans: ", allLoans);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const individualBorrow = async () => {
    const eachTermInSecond = eachTerm*86400;
    try {
      if (contract) {
        const response = await contract.methods
          .individual_borrow(vaultId, vaultType, amount, eachInstallmentAmount, installments, eachTermInSecond)
          .send({ from: account[0]});
        console.log("response: ", response);
        // getAllLoans();
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  function convertTimestampToDateString(timestamp) {
    const milliseconds = timestamp * 1000; // Convert to milliseconds
    const date = new Date(milliseconds);
    const dateString = date.toDateString(); // Get the date string
    return dateString;
  }
  return (
    <>
    <div>
        <Header/>
    </div>
    
    <div>
    <Container maxWidth="xl" sx={{ width: '100%', mt: 4 }}>     
      <Typography variant="h4" align="center" gutterBottom>
        Individual Vaults
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="Available Loans Table">
          <TableHead>
            <TableRow>
              <TableCell>Vault ID</TableCell>
              <TableCell align="right">Total Supply</TableCell>
              <TableCell align="right">Remaining Supply</TableCell>
              <TableCell align="right">Interest Rate</TableCell>
              <TableCell align="right">Interest Earned</TableCell>
              <TableCell align="right">Creation Date</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allVaults.map((data) => (
              <TableRow key={data.vault_id}>
                <TableCell component="th" scope="row">
                  {data.vault_id}
                </TableCell>
                <TableCell align="right">{data.total_supply}</TableCell>
                <TableCell align="right">{data.remaining_supply}</TableCell>
                <TableCell align="right">{data.interest_rate}%</TableCell>
                <TableCell align="right">{data.interest_earned}</TableCell>
                <TableCell align="right">{convertTimestampToDateString(data.creation_date)}</TableCell>
                <TableCell align="right">
                  <button className={styles.stake} onClick={()=>handleClickOpen(data.vault_id, 'individual')}>
                    Borrow
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </div>
        
    <div>
    <Container maxWidth="xl" sx={{ width: '100%', mt: 4 }}>     
      <Typography variant="h4" align="center" gutterBottom>
        Group Vaults
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="Available Loans Table">
          <TableHead>
            <TableRow>
              <TableCell>Vault ID</TableCell>
              <TableCell align="right">Total Supply</TableCell>
              <TableCell align="right">Remaining Supply</TableCell>
              <TableCell align="right">Interest Rate</TableCell>
              <TableCell align="right">Interest Earned</TableCell>
              <TableCell align="right">Creation Date</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allGroupVault.map((data) => (
              <TableRow key={data.vault_id}>
                <TableCell component="th" scope="row">
                  {data.vault_id}
                </TableCell>
                <TableCell align="right">{data.total_supply}</TableCell>
                <TableCell align="right">{data.remaining_supply}</TableCell>
                <TableCell align="right">{data.interest_rate}%</TableCell>
                <TableCell align="right">{data.interest_earned}</TableCell>
                <TableCell align="right">{convertTimestampToDateString(data.creation_date)}</TableCell>
                <TableCell align="right">
                  <button className={styles.stake} onClick={()=>handleClickOpen(data.vault_id, 'group')}>
                    Borrow
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </div>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        disableEnforceFocus
      >
        <DialogTitle id="form-dialog-title">Loan Form</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                
                id="amount"
                label="Amount"
                type="number"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="installment-select"
                options={installmentOptions}
                getOptionLabel={(option) => option.toString()}
                value={installments}
                onChange={(event, newValue) => {
                  setInstallments(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Installments" variant="outlined" />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="installment-amount"
                label="Each Installment Amount"
                type="number"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                value={eachInstallmentAmount}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="term-select"
                options={termOptions}
                getOptionLabel={(option) => option.toString() + " days"}
                value={eachTerm}
                onChange={(event, newValue) => {
                  setEachTerm(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Each Term" variant="outlined" />}
              />
            </Grid>
            <Grid item xs={12}>

              <Button onClick={handleClose} variant="contained" color="primary" fullWidth>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle sx={{ fontSize: 30 }}>SUCCESS<CheckCircleIcon sx={{ fontSize: 30, color: green[500] }} /></DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
    
  );
}
