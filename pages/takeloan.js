import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';

export default function LoanModal() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [installments, setInstallments] = useState(5);
  const [eachInstallmentAmount, setEachInstallmentAmount] = useState(0);
  const [eachTerm, setEachTerm] = useState(30);

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

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Take Loan
      </Button>
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
    </div>
  );
}

