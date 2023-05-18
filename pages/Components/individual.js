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
    onSubmit(account, contract, amount, interestRate);
    const response = await contract.methods
      .vaultId_vault(0)
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

const LendersTable = (props) => {
  const { web3, account, contract } = useMifiApi();
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
          const response = await contract.methods
            .vaultId_vault(2)
            .call({ from: account[0] });
          console.log("vault:1 ", response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllVaults();
  }, [contract, props]);

  const getStatus = (status) => {
    if (status == 0) {
      return "Pending";
    }
    if (status == 1) {
      return "Approved";
    }
  };

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
            <BoldTableCell>Vault Status</BoldTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allVaults.map((data) => (
            <TableRow key={data.vault_id}>
              <TableCell>{data.vault_id}</TableCell>
              <TableCell>{data.total_supply}</TableCell>
              <TableCell>{data.remaining_supply}</TableCell>
              <TableCell>{data.interest_rate}%</TableCell>
              <TableCell>{data.interest_earned}</TableCell>
              <TableCell>{data.creation_date}</TableCell>
              <TableCell>{getStatus(data.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const IndividualLendersPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmDialog = async (account, contract, amount, rate) => {
    // Do something with the amount
    try {
      console.log(contract);
      if (contract) {
        const response = await contract.methods
          .create_individual_vault(amount, rate)
          .send({ from: account[0] });
        // setAllVaults(
        //   await contract.methods
        //     .show_all_individual_vault()
        //     .call({ from: account[0]})
        // );
        setRefresh(!refresh);        
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
      <LendersTable refresh={refresh}/>
      <VaultFormDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleConfirmDialog}
      />
    </div>
  );
};

export default IndividualLendersPage;
