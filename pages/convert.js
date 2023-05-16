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
  const [convertedAmount, setConvertedAmount] = useState('');
  const [conversionDirection, setConversionDirection] = useState('ETH_TO_BDT');

  const conversionRate = 193207.53; // 1 ETH = 193207.53 BDT (use a service/API to fetch this dynamically)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    if (conversionDirection === 'ETH_TO_BDT') {
      setConvertedAmount(event.target.value * conversionRate);
    } else {
      setConvertedAmount(event.target.value / conversionRate);
    }
  };

  const handleConversion = () => {
    console.log(
      `Converted ${amount} ${conversionDirection === 'ETH_TO_BDT' ? 'ETH' : 'BDT'} to ${
        convertedAmount
      } ${conversionDirection === 'ETH_TO_BDT' ? 'BDT' : 'ETH'}`
    );
    handleClose();
  };

  const handleSwap = () => {
    setConversionDirection(conversionDirection === 'ETH_TO_BDT' ? 'BDT_TO_ETH' : 'ETH_TO_BDT');
    setAmount('');
    setConvertedAmount('');
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Convert
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Paper className={classes.paper}>
          <h2 id="conversion-modal-title">
            Convert {conversionDirection === 'ETH_TO_BDT' ? 'ETH to BDT' : 'BDT to ETH'}
          </h2>
          <Button color="primary" onClick={handleSwap}>
            {conversionDirection === 'ETH_TO_BDT' ? 'Swap to BDT to ETH' : 'Swap to ETH to BDT'}
          </Button>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label={conversionDirection === 'ETH_TO_BDT' ? 'ETH Amount' : 'BDT Amount'}
                value={amount}
                onChange={handleAmountChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={conversionDirection === 'ETH_TO_BDT' ? 'BDT Amount' : 'ETH Amount'}
                value={convertedAmount}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConversion}
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