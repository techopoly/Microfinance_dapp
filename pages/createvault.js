import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const MyComponent = () => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    console.log(`Amount: ${amount}, Interest Rate: ${interestRate}`);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Enter Details"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <TextField
            margin="dense"
            id="interest"
            label="Interest Rate"
            type="number"
            fullWidth
            value={interestRate}
            onChange={e => setInterestRate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleConfirm}  variant="contained"
                color="primary" fullWidth>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MyComponent;
