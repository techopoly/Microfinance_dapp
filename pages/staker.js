import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Select,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TableContainer,
  Table,
  TableHead,
  Paper,
  Modal,
  Grid,
  TableRow,
  MenuItem,
  TableCell,
  TableBody,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Web3 from "web3";
import Link from "next/link";
import Header from "./appbar";
import useMifiApi from "./hooks/useMifiApi";

const StyledLink = styled(Link)`
  text-decoration: none;
`;
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
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const GroupLenders = (props) => {
  const classes = useStyles();
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [joiningAmount, setJoiningAmount] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const { web3, account, contract } = useMifiApi();
  const [contribution, setContribution] = useState([]);
  const [allLoans, setAllLoans] = useState();
  const [staker, setStaker] = useState([]);
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [conversionDirection, setConversionDirection] = useState("ETH_TO_BDT");
  const conversionRate = 193207.53; // 1 ETH = 193207.53 BDT (use a service/API to fetch this dynamically)
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllLoans();
  }, [contract]);

  const getAllLoans = async () => {
    try {
      if (contract) {
        const allLoans = await contract.methods
          .show_all_loan()
          .call({ from: account[0] });
        console.log("allLoans: ", allLoans);
        setAllLoans(allLoans);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
  }, [contract]);
  const addStakingBalance = async (value, type) => {
    //value = in eth
    const valueInString = value.toString();
    // const roundedNumber = Number(value.toFixed(8));
    // console.log(roundedNumber.toString() )
    console.log(value);
    const weiAmount = Web3.utils.toWei(valueInString, "ether");
    try {
      if (contract) {
        const balance = await contract.methods
          .add_balance(type)
          .send({ from: account[0], value: weiAmount });
        setStaker(
          await contract.methods
            .address_staker(account[0])
            .call({ from: account[0] })
        );
        console.log(staker);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const weiToEth = (weiValue) => {
    return web3.utils.fromWei(weiValue, "ether");
  };

  const ethToBdt = (ethAmount) => {
    return ethAmount * conversionRate;
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
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    if (conversionDirection === "ETH_TO_BDT") {
      setConvertedAmount(event.target.value * conversionRate);
    } else {
      setConvertedAmount(event.target.value / conversionRate);
    }
  };
  const handleConversion = () => {
    console.log(
      `Converted ${amount} ${
        conversionDirection === "ETH_TO_BDT" ? "ETH" : "BDT"
      } to ${convertedAmount} ${
        conversionDirection === "ETH_TO_BDT" ? "BDT" : "ETH"
      }`
    );
    if (amount > convertedAmount) {
      addStakingBalance(convertedAmount, "staker");
    } else {
      addStakingBalance(amount, "staker");
    }
    handleClose();
  };

  const handleSwap = () => {
    setConversionDirection(
      conversionDirection === "ETH_TO_BDT" ? "BDT_TO_ETH" : "ETH_TO_BDT"
    );
    setAmount("");
    setConvertedAmount("");
  };
  const approveLoan = async (loanId, vaultType) => {
    try {
      if (contract) {
        const response = await contract.methods
          .approve_loan(loanId, vaultType)
          .send({ from: account[0] });
        console.log("response: ", response);
        getAllLoans();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stake = async (loanId) => {
    try {
      if (contract) {
        const response = await contract.methods
          .stake(loanId)
          .send({ from: account[0] });
        console.log("response: ", response);
        getAllLoans();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStatus = (status) => {
    if (status == 0) {
      return "Pending";
    }
    if (status == 1) {
      return "Approved";
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleJoinDialogOpen = (group) => {
    setSelectedGroup(group);
    setJoinDialogOpen(true);
  };

  const handleJoinDialogClose = () => {
    setJoinDialogOpen(false);
    setSelectedGroup(null);
    setJoiningAmount(0);
  };

  const handleJoiningAmountChange = (event) => {
    setJoiningAmount(Number(event.target.value));
  };

  //send joining contract req from here:
  const handleJoinConfirm = () => {
    // Perform join operation here
    handleJoinDialogClose();
  };

  const handleDetailsDialogOpen = (group) => {
    setSelectedGroup(group);
    setContribution(group);
    setDetailsDialogOpen(true);
  };

  const handleDetailsDialogClose = () => {
    setDetailsDialogOpen(false);
    setSelectedGroup(null);
  };
  const BoldTableCell = styled(TableCell)({
    fontWeight: "bold",
  });

  const handleStatusChange = async (loanId, loanType) => {
    console.log("loanId: ", loanId);
    approveLoan(loanId, loanType);
  };

  const secondToDays = (second) => {
    return second / 86400;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "yellow";
      case "Approved":
        return "green";
      case "Denied":
        return "red";
      default:
        return "";
    }
  };
  const router = useRouter();
  const profile = (e) => {
    console.log(e);
    const id = e;
    router.push(`/user/${id}`);
  };

  function convertTimestampToDateString(timestamp) {
    const milliseconds = timestamp * 1000; // Convert to milliseconds
    const date = new Date(milliseconds);
    const dateString = date.toDateString(); // Get the date string

    return dateString;
  }
  return (
    <>
      <Header />
      {!parseInt(staker.balance) && (
        <Button onClick={becomeStaker} variant="contained" color="success">
          Become a Staker
        </Button>
      )}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Staking Balance
      </Button>
      <hr></hr>
      <Button onClick={addStakingBalance} variant="contained" color="primary">
        Convert Balance to Staking Balance
      </Button>
      

      <Box className={classes.section}>
        <Typography
          variant="h6"
          component="h3"
          className={classes.sectionTitle}
        >
          Total Staking Balance: {ethToBdt(weiToEth(staker.balance))}
        </Typography>
        <Typography
          variant="h6"
          component="h3"
          className={classes.sectionTitle}
        >
          Total Earned: {ethToBdt(weiToEth(staker.reward))}
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <BoldTableCell align="center" variant="head">
                Loan ID
              </BoldTableCell>
              <BoldTableCell align="center" variant="head">
                Vault ID
              </BoldTableCell>
              <BoldTableCell align="center" variant="head">
                Total Loan Amount
              </BoldTableCell>
              <BoldTableCell align="center" variant="head">
                Borrower
              </BoldTableCell>
              <BoldTableCell align="center" variant="head">
                Staker
              </BoldTableCell>
              <BoldTableCell align="center" variant="head">
                Starting Date
              </BoldTableCell>
              <BoldTableCell align="center" variant="head">
                Details
              </BoldTableCell>
              <BoldTableCell align="center" variant="head">
                Status
              </BoldTableCell>
              <BoldTableCell align="center" variant="head">
                Stake
              </BoldTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allLoans?.map((group, index) => (
              <TableRow key={index}>
                <TableCell sx={{ minWidth: 30 }} align="center">
                  {index + 1}
                </TableCell>
                <TableCell sx={{ minWidth: 30 }} align="center">
                  {group.vault_id}
                </TableCell>
                <TableCell align="center">{group.amount}</TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    onClick={() => profile(group.borrower)}
                    variant="outlined"
                  >
                    {group.borrower.substring(0, 6) +
                      "..." +
                      group.borrower.substring(11, 15)}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    onClick={() => profile(group.staker)}
                    variant="outlined"
                  >
                    {group.staker.substring(0, 6) +
                      "..." +
                      group.staker.substring(11, 15)}
                  </Button>
                </TableCell>
                <TableCell align="center">
                  {convertTimestampToDateString(group.start_date)}
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleDetailsDialogOpen(group)}
                    variant="contained"
                  >
                    Details
                  </Button>
                </TableCell>
                <TableCell>
                  <Typography color="warning.main">
                    {getStatus(group.status)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => stake(index + 1)}
                  >
                    Stake
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={joinDialogOpen} onClose={handleJoinDialogClose}>
        <DialogTitle>Join Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Joining Amount"
            type="number"
            value={joiningAmount}
            onChange={handleJoiningAmountChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleJoinDialogClose}>Cancel</Button>
          <Button onClick={handleJoinConfirm}>Join</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={detailsDialogOpen}
        onClose={handleDetailsDialogClose}
        aria-labelledby="customized-dialog-title"
        fullWidth // Make dialog take full width
        maxWidth={"md"} // Define max width, can take 'sm', 'md', 'lg', 'xl', 'false'
        PaperProps={{ style: { width: "80%" } }} // Specify custom width percentage here
      >
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <BoldTableCell align="center" variant="head">
                    Total Installments
                  </BoldTableCell>
                  <BoldTableCell align="center" variant="head">
                    Each Installment Amount
                  </BoldTableCell>
                  <BoldTableCell align="center" variant="head">
                    Each Term
                  </BoldTableCell>
                  <BoldTableCell
                    align="center"
                    variant="head"
                    sx={{ minWidth: 200 }}
                  >
                    Next Term Due Date
                  </BoldTableCell>

                  <BoldTableCell align="center" variant="head">
                    Installments Completed
                  </BoldTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">
                    {contribution.no_of_installments}
                  </TableCell>
                  <TableCell align="center">
                    {contribution.each_installment_amount}
                  </TableCell>
                  <TableCell align="center">
                    {secondToDays(contribution.each_term)}
                  </TableCell>
                  <TableCell align="center">
                    {contribution.next_term_due_date}
                  </TableCell>
                  <TableCell align="center">
                    {contribution.no_of_installments_done}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <div>
        <Modal open={open} onClose={handleClose}>
          <Paper className={classes.paper}>
            <h2 id="conversion-modal-title">
              Convert{" "}
              {conversionDirection === "ETH_TO_BDT"
                ? "ETH to BDT"
                : "BDT to ETH"}
            </h2>
            <Button color="primary" onClick={handleSwap}>
              {conversionDirection === "ETH_TO_BDT"
                ? "Swap to BDT to ETH"
                : "Swap to ETH to BDT"}
            </Button>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label={
                    conversionDirection === "ETH_TO_BDT"
                      ? "ETH Amount"
                      : "BDT Amount"
                  }
                  value={amount}
                  onChange={handleAmountChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={
                    conversionDirection === "ETH_TO_BDT"
                      ? "BDT Amount"
                      : "ETH Amount"
                  }
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
};

export default GroupLenders;
