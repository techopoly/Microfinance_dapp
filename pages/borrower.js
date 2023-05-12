import React from 'react';
import { AppBar, Toolbar, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@mui/material';
import { styled } from '@mui/system';
import Header from "./appbar";

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
            {availableLoans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell component="th" scope="row">
                  {loan.vaultOwnerID}
                </TableCell>
                <TableCell align="right">{loan.totalSupply}</TableCell>
                <TableCell align="right">{loan.remainingSupply}</TableCell>
                <TableCell align="right">{loan.interestRate}%</TableCell>
                <TableCell align="right">{loan.interestEarned}</TableCell>
                <TableCell align="right">{loan.creationDate}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary">
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
    </>
  );
}
