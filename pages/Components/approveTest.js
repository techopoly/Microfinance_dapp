import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import useMifiApi from "../hooks/useMifiApi";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const GroupLenders = (props) => {
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [joiningAmount, setJoiningAmount] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [allVaults, setAllVaults] = useState([]);
  const { web3, account, contract } = useMifiApi();
  const [contribution, setContribution] = useState([]);
  const [allLoans, setAllLoans] = useState();
  const [refresh,setRefresh]= useState(false);
  
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

  const handleStatusChange = async(loanId, loanType) => {
   console.log('loanId: ', loanId); 
   approveLoan(loanId, loanType);
    }

    const secondToDays =(second)=>{
      return second/86400;
    }

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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <BoldTableCell align="center" variant="head">
                Vault ID
              </BoldTableCell>
              <BoldTableCell align="center" variant="head">
                Total Amount
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
              <TableRow key={group.vault_id}>
                <TableCell sx={{ minWidth: 200 }}  align="center">{index + 1}</TableCell>
                <TableCell   align="center">{group.amount}</TableCell>
                <TableCell>
                  <Button
                  color="secondary"
                    onClick={() => profile(group.borrower)}
                    variant="outlined"
                  >
                    {group.borrower}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                  color="secondary"
                    onClick={() => profile(group.staker)}
                    variant="outlined"
                  >
                    {group.staker}
                  </Button>
                </TableCell>
                <TableCell  align="center">{convertTimestampToDateString(group.start_date)}</TableCell>
                <TableCell  align="center">
                  <Button
                    onClick={() => handleDetailsDialogOpen(group)}
                    variant="contained"
                  >
                    Details
                  </Button>
                </TableCell>
                <TableCell>
                  <Select
                  
                  value={group.status}
                    onChange={(e) =>
                      handleStatusChange(index+1, group.vault_type)
                    }
                    sx={{ color: getStatusColor(group.status), marginLeft:"2.5rem"  }}
                  >
                    <MenuItem value="0" id={group.vault_id}>
                      <Typography color="warning.main">Pending</Typography>
                    </MenuItem>
                    <MenuItem value="1" id={group.vault_id}>
                      <Typography color="success.main">Approved</Typography>
                    </MenuItem>
                    <MenuItem value="2" id={group.vault_id}>
                      <Typography color="error.main">Denied</Typography>
                    </MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                    <Button variant="contained" color="success" onClick={()=>stake(index+1)}>
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
      <Dialog open={detailsDialogOpen} onClose={handleDetailsDialogClose} 
      
      aria-labelledby="customized-dialog-title"
      fullWidth // Make dialog take full width
      maxWidth={'md'} // Define max width, can take 'sm', 'md', 'lg', 'xl', 'false'
      PaperProps={{ style: { width: '80%' } }} // Specify custom width percentage here
      >
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          <TableContainer >
            <Table>
              <TableHead >
                <TableRow>
                <BoldTableCell align="center" variant="head" >
                    Total Installments
                  </BoldTableCell>
                  <BoldTableCell align="center" variant="head">
                    Each Installment Amount
                  </BoldTableCell>
                  <BoldTableCell align="center" variant="head">
                    Each Term
                  </BoldTableCell>
                  <BoldTableCell align="center" variant="head" sx={{ minWidth: 200 }}>
                    Next Term Due Date
                  </BoldTableCell>

                  <BoldTableCell align="center" variant="head">
                     Installments Completed
                  </BoldTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow >
                    <TableCell align="center">{contribution.no_of_installments}</TableCell>
                    <TableCell align="center">{contribution.each_installment_amount}</TableCell>
                    <TableCell align="center">{secondToDays(contribution.each_term)}</TableCell>
                    <TableCell align="center">{contribution.next_term_due_date}</TableCell>
                    <TableCell align="center">{contribution.no_of_installments_done}</TableCell>

                  </TableRow>
           
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}



export default GroupLenders;

