import React, { useState } from 'react';
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle } from '@mui/material';

const MyComponent = () => {
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    setOpen(true);

    // Simulating an asynchronous operation
    setTimeout(() => {
      setOpen(false);
      // Your desired function or code to be executed after the loading is complete
    }, 2000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Call Function
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <DialogTitle>Loading</DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyComponent;
