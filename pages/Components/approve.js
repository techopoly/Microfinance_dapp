import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';

const StyledTable = styled(Table)({
  minWidth: 650,
});

const ApproveBorrowers = () => {
  const [borrowers, setBorrowers] = useState([
    {
      id: 1,
      vaultId: 101,
      borrowerId: 1,
      amount: 5000,
      interestRate: 5,
      creationDate: '2022-03-20',
      status: 'pending',
    },
    {
      id: 2,
      vaultId: 102,
      borrowerId: 2,
      amount: 10000,
      interestRate: 6,
      creationDate: '2022-03-25',
      status: 'approved',
    },
    {
      id: 3,
      vaultId: 103,
      borrowerId: 3,
      amount: 7000,
      interestRate: 4,
      creationDate: '2022-04-01',
      status: 'denied',
    },
    {
      id: 4,
      vaultId: 104,
      borrowerId: 4,
      amount: 8000,
      interestRate: 5,
      creationDate: '2022-04-05',
      status: 'pending',
    },
  ]);

  const handleStatusChange = (event, id) => {
    const updatedBorrowers = borrowers.map((borrower) => {
      if (borrower.id === id) {
        return { ...borrower, status: event.target.value };
      }
      return borrower;
    });
    setBorrowers(updatedBorrowers);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '80%' }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Borrower Approval Panel
        </Typography>
        <TableContainer component={Paper}>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Vault ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Borrower ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Interest Rate</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Creation Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {borrowers.map((borrower) => (
                <TableRow key={borrower.id}>
                  <TableCell>{borrower.vaultId}</TableCell>
                  <TableCell>{borrower.borrowerId}</TableCell>
                  <TableCell>{borrower.amount}</TableCell>
                  <TableCell>{borrower.interestRate}%</TableCell>
                  <TableCell>{borrower.creationDate}</TableCell>
                  <TableCell>
                    <FormControl sx={{ minWidth: 120 }}>
                      <Select
                        value={borrower.status}
                        onChange={(e) => handleStatusChange(e, borrower.id)}
                        sx={
                          borrower.status === 'pending'
                            ? { color: 'warning.main', fontWeight: 'bold' }
                            : borrower.status ===  'approved'
                            ? { color: 'success.main', fontWeight: 'bold' }
                            : { color: 'error.main', fontWeight: 'bold' }
                        }
                      >
                        <MenuItem value="pending" sx={{ color: 'warning.main' }}>
                          Pending
                        </MenuItem>
                        <MenuItem value="approved" sx={{ color: 'success.main' }}>
                          Approved
                        </MenuItem>
                        <MenuItem value="denied" sx={{ color: 'error.main' }}>
                          Denied
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableContainer>
      </div>
    </div>
    
    );
};

export default ApproveBorrowers;