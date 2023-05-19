import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal, 
  TextField, 
  Grid
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./appbar";
import useMifiApi from "./hooks/useMifiApi";
import Web3 from "web3";

const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: 1,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(2),
      marginBottom: 0,
    },
  },
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

const stakingData = [
  {
    id: 1,
    vault_owner: "abcd1234",
    amount: 5000,
    address: "02x539023430234",
    borrower_name: "John Doe",
    borrower_reputation_score: 4.2,
    interest_rate: 8,
    no_of_installments: 12,
    installments_completed: 3,
    Installment_amount: 3000,
    Each_term: "40 days",
    status: "Pending",
    creation_date: "2022-01-15",
  },
  {
    id: 2,
    vault_owner: "efgh5678",
    amount: 10000,
    address: "02x539023430234",
    borrower_name: "Jane Doe",
    borrower_reputation_score: 4.7,
    interest_rate: 6.5,
    no_of_installments: 6,
    installments_completed: 6,
    Installment_amount: 4000,
    Each_term: "20 days",
    status: "Approved",
    creation_date: "2022-03-21",
  },
  {
    id: 3,
    vault_owner: "ijkl9012",
    address: "02x539023430234",
    amount: 7500,
    borrower_name: "Bob Smith",
    borrower_reputation_score: 3.8,
    interest_rate: 7.5,
    no_of_installments: 8,
    installments_completed: 2,
    Installment_amount: 9000,
    Each_term: "45 days",
    status: "Pending",
    creation_date: "2022-05-09",
  },
  {
    id: 4,
    vault_owner: "mnop3456",
    amount: 12000,
    address: "02x539023430234",
    borrower_name: "Alice Johnson",
    borrower_reputation_score: 4.9,
    interest_rate: 5,
    no_of_installments: 10,
    installments_completed: 7,
    Installment_amount: 3000,
    Each_term: "90 days",
    status: "Pending",
    creation_date: "2022-07-02",
  },
];

export default function StakerPage() {
  const classes = useStyles();
  const { web3, account, contract } = useMifiApi();
  const [staker, setStaker] = useState([]);
  ///////////////////////////convert ////////////////
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [conversionDirection, setConversionDirection] = useState('ETH_TO_BDT');

  const conversionRate = 193207.53; // 1 ETH = 193207.53 BDT (use a service/API to fetch this dynamically)
  const [allLoans, setAllLonas] = useState([]);
  //////////////////////////////////////////////////////////

  useEffect(() => {
    const getStakerInfo = async () => {
      try {
        console.log(contract);
        if (contract) {
          const staker = await contract.methods
            .address_staker(account[0])
            .call({ from: account[0] });
          setStaker(staker);
          console.log("staker: ", staker);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStakerInfo();
    getAllLoans();
  }, [contract]);

  const getAllLoans = async () => {
    try {
      if (contract) {
        const allLoans = await contract.methods
          .show_all_loan()
          .call({ from: account[0]});
          setAllLonas(allLoans);
        console.log("allLoans: ", allLoans);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addStakingBalance = async (type, value) => {
    const weiAmount = Web3.utils.toWei("1", "ether");
    try {
      console.log(contract);
      if (contract) {
        const balance = await contract.methods
          .add_balance(type)
          .send({ from: account[0], value: weiAmount });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const becomeStaker = async () => {
    try {
      console.log(contract);
      if (contract) {
        const response = await contract.methods
          .become_staker(true)
          .send({ from: account[0] });
        setStaker(
          await contract.methods
            .address_staker(account[0])
            .call({ from: account[0] })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
//////////////////////////////convert //////////////////////
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
const getStatus = (status) => {
  if (status == 0) {
    return "Pending";
  }
  if (status == 1) {
    return "Approved";
  }
};


///////////////////////////////////////////////////////////////
  return (
    <>
      <Header />
      {!parseInt(staker.balance) && <Button onClick={becomeStaker} variant="contained" color="success">
        Become a Staker
      </Button>}
      <Button
        onClick={() => addStakingBalance("staker")}
        variant="contained"
        color="success"
      >
        Add Staking Balance
      </Button>
      <Button onClick={addStakingBalance} variant="contained" color="success">
        Convert Balance to Staking Balance
      </Button>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Convert
      </Button>
      <Container maxWidth="xl">
        <Box className={classes.section}>
          <Typography
            variant="h6"
            component="h3"
            className={classes.sectionTitle}
          >
            Total Staking Balance: {staker.balance}
          </Typography>
          <Typography
            variant="h6"
            component="h3"
            className={classes.sectionTitle}
          >
            Total Earned: 2,500
          </Typography>
          <Typography
            variant="h6"
            component="h3"
            className={classes.sectionTitle}
          >
            NID Verified:{" "}
            <CheckCircleRoundedIcon color="success" sx={{ fontSize: 25 }} />
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>Loan ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Borrower Address</TableCell>
                {/* <TableCell>Borrower Reputation Score</TableCell>
                <TableCell>Interest Rate</TableCell> */}
                <TableCell>No. of Installments</TableCell>
                <TableCell>No. Installments Completed</TableCell>
                <TableCell>Each Installment Amount</TableCell>
                <TableCell>Each Term</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allLoans.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{data.amount}</TableCell>
                  <TableCell>{data.borrower.substring(0,5)+'...'+ data.borrower.substring(13)}</TableCell>
                  {/* <TableCell>{data.borrower_reputation_score}</TableCell> */}
                  {/* <TableCell>{data.interest_rate}%</TableCell> */}
                  <TableCell>{data.no_of_installments}</TableCell>
                  <TableCell>{data.no_of_installments_done}</TableCell>
                  <TableCell>{data.Installment_amount}</TableCell>
                  <TableCell>{data.each_term}</TableCell>
                  <TableCell>{data.start_date}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="success">
                      {getStatus(data.status)}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">
                      Stake
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <div className="space"></div>

      <div>
   
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
    </>
  );
}
