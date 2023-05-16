import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardMedia,
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
  Paper,
} from "@mui/material";
import { green, red, yellow } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import useMifiApi from "../hooks/useMifiApi";
import vault from "../vaultmanagement";

const dummyData = [
  {
    id: "VL0001",
    totalSupply: 10000,
    remainingSupply: 6000,
    interestRate: 5,
    interestEarned: 1000,
    creationDate: "2022-01-01",
    status: "approved",
  },
  {
    id: "VL0002",
    totalSupply: 20000,
    remainingSupply: 8000,
    interestRate: 6,
    interestEarned: 1500,
    creationDate: "2022-01-02",
    status: "pending",
  },
  {
    id: "VL0003",
    totalSupply: 15000,
    remainingSupply: 5000,
    interestRate: 4,
    interestEarned: 800,
    creationDate: "2022-01-03",
    status: "denied",
  },
  {
    id: "VL0004",
    totalSupply: 18000,
    remainingSupply: 10000,
    interestRate: 5.5,
    interestEarned: 1200,
    creationDate: "2022-01-04",
    status: "approved",
  },
  {
    id: "VL0005",
    totalSupply: 25000,
    remainingSupply: 15000,
    interestRate: 6.5,
    interestEarned: 1800,
    creationDate: "2022-01-05",
    status: "pending",
  },
  {
    id: "VL0006",
    totalSupply: 12000,
    remainingSupply: 6000,
    interestRate: 4.5,
    interestEarned: 600,
    creationDate: "2022-01-06",
    status: "approved",
  },
  {
    id: "VL0007",
    totalSupply: 22000,
    remainingSupply: 8000,
    interestRate: 6,
    interestEarned: 1500,
    creationDate: "2022-01-07",
    status: "pending",
  },
  {
    id: "VL0008",
    totalSupply: 18000,
    remainingSupply: 8000,
    interestRate: 5.5,
    interestEarned: 1200,
    creationDate: "2022-01-08",
    status: "denied",
  },
  {
    id: "VL0009",
    totalSupply: 15000,
    remainingSupply: 8000,
    interestRate: 4,
    interestEarned: 800,
    creationDate: "2022-01-09",
    status: "approved",
  },
  {
    id: "VL0010",
    totalSupply: 20000,
    remainingSupply: 10000,
    interestRate: 6,
    interestEarned: 1500,
    creationDate: "2022-01-10",
    status: "denied",
  },
];

const vaultStatusColors = {
  approved: green[500],
  pending: yellow[500],
  denied: red[500],
};

const VaultFormDialog = ({ open, onClose, onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [interestRate, setinterestRate] = useState("");
  const { web3, account, contract } = useMifiApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(account, contract, amount,interestRate);
    const response = await contract.methods
          .vaultId_vault(1)
          .call({ from: account[0] });
    console.log(response);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleinterestRateChange = (e) => {
    setinterestRate(e.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Vault</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="dense"
            label="Amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
          />
          <TextField
            margin="dense"
            fullWidth
            type="number"
            label="Interest Rate"
            value={interestRate}
            onChange={handleinterestRateChange}
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
  const { web3, account, contract } = useMifiApi();
  // const checkup = () => {
  //   console.log("Show Contract : ");
  //   if (contract) {
  //      console.log(contract);
  //   }
  // };
  return (
    <Card sx={{ minWidth: "100%", marginBottom: "2rem" }}>
      <CardMedia
        component="img"
        height="400"
        image="https://www.kotak.com/content/dam/Kotak/article-images/4-tips-to-get-the-best-personal-loan-interest-rates-desk.jpg"
        alt="Individual Lenders"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ justifyContent: "center" }}
        >
          Individual Lenders
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
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
  fontWeight: "bold",
});

const LendersTable = () => {

  const{web3, account, contract} = useMifiApi();
  const [allVaults, setAllVaults] = useState([]);

  useEffect(() => {
    const getAllVaults = async () => {
      try {
        console.log(contract);
        if (contract) {
          const vaults = await contract.methods
            .show_all_individual_vault()
            .call({ from: account[0] });
          console.log("vaults: ", vaults);
          setAllVaults(vaults);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllVaults();
  }, [contract]);

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

  const handleConfirmDialog = async (account,contract,amount,rate) => {
    // Do something with the amount
    try {
      console.log(contract);
      if (contract) {
        const response = await contract.methods
          .create_individual_vault(amount, rate)
          .send({ from: account[0] });
      }
    } catch (error) {
      console.log(error);
    }

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
