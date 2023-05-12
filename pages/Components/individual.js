import { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const dummyData = [
  { id: 'VL0001', totalSupply: 10000, remainingSupply: 6000, interestRate: 5, interestEarned: 1000, creationDate: '2022-01-01', status: 'approved' },
  { id: 'VL0002', totalSupply: 20000, remainingSupply: 8000, interestRate: 6, interestEarned: 1500, creationDate: '2022-01-02', status: 'pending' },
  { id: 'VL0003', totalSupply: 15000, remainingSupply: 5000, interestRate: 4, interestEarned: 800, creationDate: '2022-01-03', status: 'denied' },
  { id: 'VL0004', totalSupply: 18000, remainingSupply: 10000, interestRate: 5.5, interestEarned: 1200, creationDate: '2022-01-04', status: 'approved' },
  { id: 'VL0005', totalSupply: 25000, remainingSupply: 15000, interestRate: 6.5, interestEarned: 1800, creationDate: '2022-01-05', status: 'pending' },
  { id: 'VL0006', totalSupply: 12000, remainingSupply: 6000, interestRate: 4.5, interestEarned: 600, creationDate: '2022-01-06', status: 'approved' },
  { id: 'VL0007', totalSupply: 22000, remainingSupply: 8000, interestRate: 6, interestEarned: 1500, creationDate: '2022-01-07', status: 'pending' },
  { id: 'VL0008', totalSupply: 18000, remainingSupply: 8000, interestRate: 5.5, interestEarned: 1200, creationDate: '2022-01-08', status: 'denied' },
  { id: 'VL0009', totalSupply: 15000, remainingSupply: 8000, interestRate: 4, interestEarned: 800, creationDate: '2022-01-09', status: 'approved' },
  { id: 'VL0010', totalSupply: 20000, remainingSupply: 10000, interestRate: 6, interestEarned: 1500, creationDate: '2022-01-10', status: 'denied' },
];

const vaultStatusColors = {
  approved: green[500],
  pending: yellow[500],
  denied: red[500],
};

const VaultFormDialog = ({ open, onClose, onSubmit }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(amount);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Vault</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const FullWidthCard = ({ onOpenDialog }) => {
  return (
    <Card sx={{ minWidth: '100%', marginBottom: '2rem' }}>
      <CardMedia
        component="img"
        height="400"
        image="https://www.kotak.com/content/dam/Kotak/article-images/4-tips-to-get-the-best-personal-loan-interest-rates-desk.jpg"
        alt="Individual Lenders"
      />
      <CardContent >
        <Typography gutterBottom variant="h5" component="div" sx={{ justifyContent: 'center' }}>
          Individual Lenders
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={onOpenDialog}
        >
          Create Vault
        </Button>
      </CardActions>
    </Card>
  );
};

const BoldTableCell = styled(TableCell)({
  fontWeight: 'bold',
});

const LendersTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <BoldTableCell>Vault ID</BoldTableCell>
            <BoldTableCell>Total Supply</BoldTableCell>
            <BoldTableCell>Remaining Supply</BoldTableCell>
            <BoldTableCell>Interest Rate</BoldTableCell>
            <BoldTableCell>Interest Earned</BoldTableCell>
            <BoldTableCell>Creation Date</BoldTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyData.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.totalSupply}</TableCell>
              <TableCell>{data.remainingSupply}</TableCell>
              <TableCell>{data.interestRate}%</TableCell>
              <TableCell>{data.interestEarned}</TableCell>
              <TableCell>{data.creationDate}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const IndividualLendersPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmDialog = (amount) => {
    // Do something with the amount
    console.log(amount);
    handleCloseDialog();
  };

  return (
    <div>
      <FullWidthCard onOpenDialog={handleOpenDialog} />
      <LendersTable />
      <VaultFormDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleConfirmDialog}
      />
    </div>
  );
};

export default IndividualLendersPage;

