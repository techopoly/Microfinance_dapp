import React from 'react';
import { AppBar, Toolbar, Button, Typography, Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import {makeStyles} from "@material-ui/core/styles";
import Header from "./appbar";




const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: 1,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(2),
      marginBottom: 0,
    },
  },
}));

const stakingData = [
  {
    id: 1,
    vault_owner: 'abcd1234',
    amount: 5000,
    address:"02x539023430234",
    borrower_name: 'John Doe',
    borrower_reputation_score: 4.2,
    interest_rate: 8,
    no_of_installments: 12,
    installments_completed:3,
    Installment_amount:3000,
    Each_term:"40 days",
    status:"Pending",
    creation_date: '2022-01-15',
  },
  {
    id: 2,
    vault_owner: 'efgh5678',
    amount: 10000,
    address:"02x539023430234",
    borrower_name: 'Jane Doe',
    borrower_reputation_score: 4.7,
    interest_rate: 6.5,
    no_of_installments: 6,
    installments_completed:6,
    Installment_amount:4000,
    Each_term:"20 days",
    status:"Approved",
    creation_date: '2022-03-21',
  },
  {
    id: 3,
    vault_owner: 'ijkl9012',
    address:"02x539023430234",
    amount: 7500,
    borrower_name: 'Bob Smith',
    borrower_reputation_score: 3.8,
    interest_rate: 7.5,
    no_of_installments: 8,
    installments_completed:2,
    Installment_amount:9000,
    Each_term:"45 days",
    status:"Pending",
    creation_date: '2022-05-09',
  },
  {
    id: 4,
    vault_owner: 'mnop3456',
    amount: 12000,
    address:"02x539023430234",
    borrower_name: 'Alice Johnson',
    borrower_reputation_score: 4.9,
    interest_rate: 5,
    no_of_installments: 10,
    installments_completed:7,
    Installment_amount:3000,
    Each_term:"90 days",
    status:"Pending",
    creation_date: '2022-07-02',
  },
];

export default function StakerPage() {
  const classes = useStyles();

  return (
    <>
     <Header/>
      <Container maxWidth="xl">
        <Box className={classes.section}>
          <Typography variant="h6" component="h3" className={classes.sectionTitle}>Total Balance: 50,000</Typography>
          <Typography variant="h6" component="h3" className={classes.sectionTitle}>Total Earned: 2,500</Typography>
          <Typography variant="h6" component="h3" className={classes.sectionTitle}>NID Verified: <CheckCircleRoundedIcon color="success" sx={{ fontSize: 25 }}/></Typography>
        </Box>
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>Borrower Name</TableCell>
                <TableCell>Borrower Address</TableCell>
                <TableCell>Borrower Reputation Score</TableCell>
                <TableCell>Interest Rate</TableCell>
                <TableCell>No. of Installments</TableCell>
                <TableCell>No. Installments completed</TableCell>
                <TableCell>Installment amount</TableCell>
                <TableCell>Each Term</TableCell>
                <TableCell>Creation Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stakingData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.amount}</TableCell>
                  <TableCell>{data.borrower_name}</TableCell>
                  <TableCell>{data.address}</TableCell>
                  <TableCell>{data.borrower_reputation_score}</TableCell>
                  <TableCell>{data.interest_rate}%</TableCell>
                  <TableCell>{data.no_of_installments}</TableCell>
                  <TableCell>{data.installments_completed}</TableCell>
                  <TableCell>{data.Installment_amount}</TableCell>
                  <TableCell>{data.Each_term}</TableCell>
                  <TableCell>{data.creation_date}</TableCell>
                  <TableCell ><Button variant="contained" color="success">Approved</Button></TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">Stake</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <div className='space'>

      </div>
    </>
  );
}
