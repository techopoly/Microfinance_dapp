import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
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
  TableCell,
  TableBody,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import useMifiApi from "../hooks/useMifiApi";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const dummyData = [
  {
    id: 'GL0001',
    totalAmount: 100000,
    interestRate: 6,
    creationDate: '2022-01-01',
    lastJoiningDate: '2022-01-31',
    members: [
      { id: 'M0001', creditScore: 750 },
      { id: 'M0002', creditScore: 800 },
      { id: 'M0003', creditScore: 700 },
    ],
  },
  {
    id: 'GL0002',
    totalAmount: 50000,
    interestRate: 7,
    creationDate: '2022-02-01',
    lastJoiningDate: '2022-02-28',
    members: [
      { id: 'M0004', creditScore: 650 },
      { id: 'M0005', creditScore: 720 },
    ],
  },
  {
    id: 'GL0003',
    totalAmount: 75000,
    interestRate: 5.5,
    creationDate: '2022-03-01',
    lastJoiningDate: '2022-03-31',
    members: [{ id: 'M0006', creditScore: 780 }],
  },
  {
    id: 'GL0004',
    totalAmount: 125000,
    interestRate: 7.5,
    creationDate: '2022-04-01',
    lastJoiningDate: '2022-04-30',
    members: [],
  },
];

// const GroupLenders = () => {
//   const [joinDialogOpen, setJoinDialogOpen] = useState(false);
//   const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
//   const [joiningAmount, setJoiningAmount] = useState(0);
//   const [selectedGroup, setSelectedGroup] = useState(null);

//   const handleJoinDialogOpen = (group) => {
//     setSelectedGroup(group);
//     setJoinDialogOpen(true);
//   };

//   const handleJoinDialogClose = () => {
//     setJoinDialogOpen(false);
//     setSelectedGroup(null);
//     setJoiningAmount(0);
//   };

//   const handleJoiningAmountChange = (event) => {
//     setJoiningAmount(Number(event.target.value));
//   };

//   const handleJoinConfirm = () => {
//     // Perform join operation here
//     console.log('Joined group:', selectedGroup, 'with amount:', joiningAmount);
//     handleJoinDialogClose();
//   };

//   const handleDetailsDialogOpen = (group) => {
//     setSelectedGroup(group);
//     setDetailsDialogOpen(true);
//   };

//   const handleDetailsDialogClose = () => {
//     setDetailsDialogOpen(false);
//     setSelectedGroup(null);
//   };
//   const BoldTableCell = styled(TableCell)({
//     fontWeight: 'bold',
//   });
//   return (
//     <>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <BoldTableCell align="center" variant="head">Vault ID</BoldTableCell>
//               <BoldTableCell align="center" variant="head">Details</BoldTableCell>
//               <BoldTableCell align="center" variant="head">Total Amount</BoldTableCell>
//               <BoldTableCell align="center" variant="head">Interest Rate</BoldTableCell>
//               <BoldTableCell align="center" variant="head">Creation Date</BoldTableCell>
//               <BoldTableCell align="center" variant="head">Joining Members</BoldTableCell>
//               <BoldTableCell align="center" variant="head">Last Joining Date</BoldTableCell>
              
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {dummyData.map((group) => (
//               <TableRow key={group.id}>
//                 <TableCell align="center">{group.id}</TableCell>
//                 <TableCell align="center">
//                   <Button onClick={() => handleDetailsDialogOpen(group)} variant="outlined">Details</Button>
//                 </TableCell>
//                 <TableCell align="center">{group.totalAmount}</TableCell>
//                 <TableCell align="center">{group.interestRate}%</TableCell>
//                 <TableCell align="center">{group.creationDate}</TableCell>
//                 <TableCell align="center">{group.members.length}</TableCell>
//                 <TableCell align="center">{group.lastJoiningDate}</TableCell>
               
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Dialog open={joinDialogOpen} onClose={handleJoinDialogClose}>
//         <DialogTitle>Join Group</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Joining Amount"
//             type="number"
//             value={joiningAmount}
//             onChange={handleJoiningAmountChange}
//             fullWidth
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleJoinDialogClose}>Cancel</Button>
//           <Button onClick={handleJoinConfirm}>Join</Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog open={detailsDialogOpen} onClose={handleDetailsDialogClose}>
//         <DialogTitle>Group Details</DialogTitle>
//         <DialogContent>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell align="center" variant="head">Member ID</TableCell>
//                   <TableCell align="center" variant="head">Credit Score</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {selectedGroup?.members.map((member) => (
//                   <TableRow key={member.id}>
//                     <TableCell align="center">{member.id}</TableCell>
//                     <TableCell align="center">{member.creditScore}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDetailsDialogClose}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };


const GroupLenders = () => {
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [joiningAmount, setJoiningAmount] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [allVauts, setAllVaults] = useState([]);
  const { web3, account, contract } = useMifiApi();
  const [contribution, setContribution] = useState([]);

  useEffect(() => {
    const getAllVaults = async () => {
      try {
        if (contract) {
          const vaults = await contract.methods
            .show_all_group_vault()
            .call({ from: account[0] });
          console.log("all Vaults: ", vaults);
          setAllVaults(vaults);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllVaults();
  }, [contract]);

  const showContribution = async (vault_id) => {
    try {
      if (contract) {
        const contribution = await contract.methods
          .show_contribution(vault_id)
          .call({ from: account[0] });
        console.log("contribution: ", contribution);
        setContribution(contribution);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const joinGroupVault = async (vaultId, contribution) => {
    try {
      if (contract) {
        const response = await contract.methods
          .join_group_vault(contribution, vaultId)
          .send({ from: account[0] });
        console.log("Response: ", response);
        showContribution(vaultId);
        setAllVaults(
          await contract.methods
            .show_all_group_vault()
            .call({ from: account[0] })
        );
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
    console.log("Joined group:", selectedGroup, "with amount:", joiningAmount);
    joinGroupVault(selectedGroup.vault_id, joiningAmount);
    handleJoinDialogClose();
  };

  const handleDetailsDialogOpen = (group) => {
    setSelectedGroup(group);
    showContribution(group.vault_id);
    setDetailsDialogOpen(true);
  };

  const handleDetailsDialogClose = () => {
    setDetailsDialogOpen(false);
    setSelectedGroup(null);
  };
  const BoldTableCell = styled(TableCell)({
    fontWeight: "bold",
  });
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
                Details
              </BoldTableCell>
              <BoldTableCell align="center" variant="head">
                Total Amount
              </BoldTableCell>
              <BoldTableCell align="center" variant="head">
                Interest Rate
              </BoldTableCell>
              <BoldTableCell align="center" variant="head">
                Creation Date
              </BoldTableCell>
              <BoldTableCell align="center" variant="head">
                Status
              </BoldTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allVauts.map((group) => (
              <TableRow key={group.vault_id}>
                <TableCell align="center">{group.vault_id}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleDetailsDialogOpen(group)}
                    variant="outlined"
                  >
                    Details
                  </Button>
                </TableCell>
                <TableCell align="center">{group.total_supply}</TableCell>
                <TableCell align="center">{group.interest_rate}%</TableCell>
                <TableCell align="center">{group.creation_date}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleJoinDialogOpen(group)}
                    variant="contained"
                  >
                    Join
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
      <Dialog open={detailsDialogOpen} onClose={handleDetailsDialogClose}>
        <DialogTitle>Group Details</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" variant="head">
                    Member Address
                  </TableCell>
                  <TableCell align="center" variant="head">
                    Contribution
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contribution.map((member, index) => (
                  <TableRow key={`${member.member} + ${index}`}>
                    <TableCell align="center">{member.member}</TableCell>
                    <TableCell align="center">{member.contribution}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};



export default GroupLenders;

