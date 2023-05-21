import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from '../styles/login.module.css';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Select,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  MenuItem,
  TableCell,
  TableBody,
} from "@mui/material";
import { red } from "@material-ui/core/colors";
import { Modal, Paper, Grid } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import useMifiApi from "./hooks/useMifiApi";
import AppBar from "./appbar";

const StyledLink = styled(Link)`
  text-decoration: none;
`;
const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: 1,
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
}));

const yellowishColor = "#FFD700";
const GroupLenders = (props) => {
  const classes = useStyles();
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [joiningAmount, setJoiningAmount] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [allVaults, setAllVaults] = useState([]);
  const { web3, account, contract } = useMifiApi();
  const [contribution, setContribution] = useState([]);
  const [allLoans, setAllLoans] = useState();
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [loanId, setLoanId] = useState();
  const [vaultType, setVaultType] = useState();

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

  const installmentRepayment = async (loanId, vaultType) => {
    try {
      if (contract) {
        const response = await contract.methods
          .individual_installment_repay_wtih_interest(loanId, vaultType)
          .send({ from: account[0], value: amount });
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

  
  const stakerinfo = (e) => {
    console.log(e);
    const id = e;
    router.push(`/staker/${id}`);
  };

  function convertTimestampToDateString(timestamp) {
    const milliseconds = timestamp * 1000; // Convert to milliseconds
    const date = new Date(milliseconds);
    const dateString = date.toDateString(); // Get the date string

    return dateString;
  }

  const createStakingStatusButton = (staker) => {
    if (staker === "0x0000000000000000000000000000000000000000") {
      return (
        <button className={styles.notstaked}>
          Not Staked
        </button>
      );
    } else {
      return (
        <button className={styles.staked}>
          Staked
        </button>
      );
    }
  };

  const handleOpen = (group, loanId) => {
    setOpen(true);
    console.log(loanId, group.vault_type);
    setAmount(group.each_installment_amount);
    setLoanId(loanId);
    setVaultType(group.vault_type);

    console.log("open Status: ", open);
  };

  const handleClose = () => {
    setOpen(false);
    setAmount("");
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleConfirm = () => {
    console.log(loanId, vaultType);
    installmentRepayment(loanId, vaultType);
    handleClose();
  };

  return (
    <>
      <AppBar />
      <hr></hr>
      <hr></hr>
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
                Status
              </BoldTableCell>
              <BoldTableCell align="center" variant="head">
              Details
              </BoldTableCell>
              <BoldTableCell align="center" variant="head">
                Staking Status
              </BoldTableCell>
              <BoldTableCell align="center" variant="head">
                Pay Installment
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
                <TableCell align="center">
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
                <TableCell align="center">
                  <Button
                    color="secondary"
                    onClick={() => stakerinfo(group.staker)}
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
                { group.status == 1 ? <Typography style={{ fontWeight: 600,color:"green" }} >
                    {getStatus(group.status)}
                  </Typography> :
                    <Typography style={{ fontWeight: 600,color:"orange" }} >
                    {getStatus(group.status)}
                  </Typography>}
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleDetailsDialogOpen(group)}
                    variant="contained"
                  >
                    Details
                  </Button>
                </TableCell>
                <TableCell align="center">
             
                   
                    
                    {createStakingStatusButton(group.staker)}
                  
                  </TableCell>
                <TableCell align="center">
                  <button
                    className={styles.stake}
                    onClick={() => handleOpen(group, index + 1)}
                    variant="contained"
                    
                  >
                    Pay
                  </button>
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
            <h2 id="conversion-modal-title">Installment Amount</h2>
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
    </>
  );
};

export default GroupLenders;
