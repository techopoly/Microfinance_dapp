import React, { useState } from 'react';
import { Button, Modal, TextField, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const ConversionModal = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAmount('');
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleConfirm = () => {
    console.log(`Confirmed adding balance of ${amount}`);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Balance
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Paper className={classes.paper}>
          <h2 id="conversion-modal-title">Add Balance</h2>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="number"
                label="Enter Amount"
                value={amount}
                onChange={handleAmountChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirm}
                className={classes.button}
                fullWidth
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </div>
  );
};

export default ConversionModal;
