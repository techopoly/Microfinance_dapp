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
////////////////////////////////////////////////Take loan///////////////////////////////
const LogoTypography = styled(Typography)({
    flexGrow: 1,
  });
const availableLoans = [
    {
        id: 1,
        vaultOwnerID: 'abcd1234',
        totalSupply: 100000,
        remainingSupply: 80000,
        interestRate: 5,
        interestEarned: 4000,
        creationDate: '2022-03-01',
      },
      {
        id: 2,
        vaultOwnerID: 'efgh5678',
        totalSupply: 50000,
        remainingSupply: 25000,
        interestRate: 7,
        interestEarned: 1750,
        creationDate: '2022-04-15',
      },
      {
        id: 3,
        vaultOwnerID: 'ijkl9012',
        totalSupply: 75000,
        remainingSupply: 50000,
        interestRate: 6,
        interestEarned: 3000,
        creationDate: '2022-05-03',
      },
      {
        id: 4,
        vaultOwnerID: 'mnop3456',
        totalSupply: 120000,
        remainingSupply: 80000,
        interestRate: 4.5,
        interestEarned: 3600,
        creationDate: '2022-06-17',
      },
      {
        id: 5,
        vaultOwnerID: 'qrst7890',
        totalSupply: 90000,
        remainingSupply: 70000,
        interestRate: 8,
        interestEarned: 5600,
        creationDate: '2022-07-05',
      },
      {
        id: 6,
        vaultOwnerID: 'uvwxy2345',
        totalSupply: 60000,
        remainingSupply: 45000,
        interestRate: 6.5,
        interestEarned: 1950,
        creationDate: '2022-08-21',
      },
      {
        id: 7,
        vaultOwnerID: 'zabcd6789',
        totalSupply: 80000,
        remainingSupply: 50000,
        interestRate: 5.5,
        interestEarned: 2750,
        creationDate: '2022-09-11',
      },
      {
        id: 8,
        vaultOwnerID: 'efghi1234',
        totalSupply: 150000,
        remainingSupply: 100000,
        interestRate: 4,
        interestEarned: 4000,
        creationDate: '2022-10-08',
      },
      {
        id: 9,
        vaultOwnerID: 'jklmn5678',
        totalSupply: 200000,
        remainingSupply: 125000,
        interestRate: 6.25,
        interestEarned: 7812.5,
        creationDate: '2022-11-25',
      },
      {
        id: 10,
        vaultOwnerID: 'opqrs9012',
        totalSupply: 180000,
        remainingSupply: 150000,
        interestRate: 3.5,
        interestEarned: 5250,
        creationDate: '2022-12-31',
      },
  // Add more loans here
];

export default function BorrowerPage() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [installments, setInstallments] = useState(5);
  const [eachInstallmentAmount, setEachInstallmentAmount] = useState(0);
  const [eachTerm, setEachTerm] = useState(30);
  const { web3, account, contract } = useMifiApi();
  const [allVaults, setAllVaults] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
    const getAllVaults = async () => {
      try {
        console.log("Watch Hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        console.log(contract);
        if (contract) {
          const vaults = await contract.methods
            .show_all_group_vault()
            .call({ from: account[0] });
          console.log("vaults: ", vaults);
          setAllVaults(vaults);
          const response = await contract.methods
            .vaultId_vault(2)
            .call({ from: account[0] });
          console.log("vault:1 ", response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllVaults();
  }, [contract]);
  return (
    <>
    

    <div>
        <Header/>
    </div>
    
    <div>
    <Container maxWidth="xl" sx={{ width: '100%', mt: 4 }}>     
      <Typography variant="h4" align="center" gutterBottom>
        Available Vaults
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
              <TableRow key={data.id}>
                <TableCell component="th" scope="row">
                  {data.vault_id}
                </TableCell>
                <TableCell align="right">{data.total_supply}</TableCell>
                <TableCell align="right">{data.remaining_supply}</TableCell>
                <TableCell align="right">{data.interest_rate}%</TableCell>
                <TableCell align="right">{data.interest_earned}</TableCell>
                <TableCell align="right">{data.creation_date}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Borrow
                  </Button>
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
    
    </>
    
  );
}
