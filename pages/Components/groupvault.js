import React, { useState } from "react";
import Testgroup from './testGroup';
import useMifiApi from "../hooks/useMifiApi";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

export default function GroupVault() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [vaultId, setVaultId] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [lastJoiningDate, setLastJoiningDate] = useState("");
  const {web3, account, contract} = useMifiApi();

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setVaultId("");
    setInterestRate("");
    setCapacity("");
    setLastJoiningDate("");
  };

  const handleVaultIdChange = (event) => {
    setVaultId(event.target.value);
  };

  const handleInterestRateChange = (event) => {
    setInterestRate(event.target.value);
  };

  const handleCapacityChange = (event) => {
    setCapacity(event.target.value);
  };

  const handleLastJoiningDateChange = (event) => {
    setLastJoiningDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    initiateGroupVault(interestRate);
    setIsDialogOpen(false);
    // Perform further actions with form data
  };

  const initiateGroupVault = async (interestRate) => {
    try {
      if (contract) {
        const response = await contract.methods
          .initiate_group_vault(interestRate)
          .send({ from: account[0]});
          console.log('response: ', response);
         const vaults = await contract.methods
         .show_all_group_vault()
         .call({ from: account[0]});
         console.log('all Vaults: ', vaults);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card sx={{ maxWidth: "100%" }} >
        <CardMedia
          component="img"
          alt="Group Vault"
          height="400"
          image="https://www.preferredbank.com/assets/files/MgcZzqlN/subad_businesssolutions.jpg"
          title="Group Vault"
        />
        <CardContent sx={{ justifyContent: 'center' }}>
          <Typography gutterBottom variant="h5" component="div">
            Group Vault
          </Typography>
          <Button variant="contained" onClick={handleDialogOpen} >
            Initialize New Vault
          </Button>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Initialize New Vault</DialogTitle>
          <DialogContent>
            {/* <TextField
              autoFocus
              margin="dense"
              id="vaultId"
              label="Vault ID"
              type="text"
              fullWidth
              required
              value={vaultId}
              onChange={handleVaultIdChange}
            /> */}
            <TextField
              margin="dense"
              id="interestRate"
              label="Interest Rate"
              type="number"
              fullWidth
              required
              value={interestRate}
              onChange={handleInterestRateChange}
            />
            {/* <FormControl fullWidth required margin="dense">
              <InputLabel id="capacity-label">Vault Capacity</InputLabel>
              <Select
                labelId="capacity-label"
                id="capacity"
                value={capacity}
                onChange={handleCapacityChange}
              >
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="large">Large</MenuItem>
              </Select>
              <FormHelperText>Select the Vault Capacity</FormHelperText>
            </FormControl>
            <TextField
              margin="dense"
              id="lastJoiningDate"
              label="Last Joining Date"
              type="date"
              fullWidth
              required
              value={lastJoiningDate}
              onChange={handleLastJoiningDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            /> */}
          </DialogContent>
          <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </form>
  </Dialog>
  <Testgroup/>
</div>
);
}