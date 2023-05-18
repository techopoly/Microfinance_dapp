import React, { useState, useEffect } from "react";
import useMifiApi from "../hooks/useMifiApi";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Select,
  Button,
} from "@mui/material";

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

export default function Vaults() {
  const { web3, account, contract } = useMifiApi();
  const [vaults, setVaults] = useState();
  const [allVaults, setAllVaults] = useState([]);

  useEffect(() => {
    const getAllVaults = async () => {
      try {
        console.log("Contract is hereeeeee");
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
  }, [contract, vaults]);

  const handleStatusChange = async (vaultId, vaultOwner) => {
    if (vaultOwner) {
      const response = await contract.methods
        .approve_vault(vaultId, "individual")
        .send({ from: account[0] });
      console.log("Response: ", response);
      const vault = await contract.methods
        .vaultId_vault(vaultId)
        .call({ from: account[0] });
      console.log("vault: ", vault);
    }
    setVaults(
      allVaults.map((vault) =>
        vault.id === vaultId ? { ...vault, status: newStatus } : vault
      )
    );
  };

  const router = useRouter();
  const profile = (e) => {
    console.log(e);
    const id = e;
    router.push(`/user/${id}`);
  };

  return (
    <div>
      <Card sx={{ maxWidth: "100%" }}>
        <CardMedia
          component="img"
          alt="Individual Vault"
          height="400"
          image="https://www.kotak.com/content/dam/Kotak/article-images/4-tips-to-get-the-best-personal-loan-interest-rates-desk.jpg"
          title="Individual Vault"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Individual Vault
          </Typography>
        </CardContent>
      </Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Vault ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Vault Creator ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Amount
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Interest Rate
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Creation Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allVaults.map((vault) => (
              <TableRow key={vault.vault_id}>
                <TableCell>{vault.vault_id}</TableCell>

                <TableCell>
                  <Button
                    onClick={() => profile(vault.vault_owner)}
                    variant="outlined"
                  >
                    {vault.vault_owner}
                  </Button>
                </TableCell>

                <TableCell href="user/">{`$${vault.total_supply}`}</TableCell>
                <TableCell>{`${vault.interest_rate}%`}</TableCell>
                <TableCell>{vault.creation_date}</TableCell>
                <TableCell>
                  <Select
                    name={vault.vault_id}
                    value={vault.status}
                    onChange={(e) =>
                      handleStatusChange(vault.vault_id, vault.vault_owner)
                    }
                    sx={{ color: getStatusColor(vault.status) }}
                  >
                    <MenuItem value="0" id={vault.vault_id}>
                      <Typography color="warning.main">Pending</Typography>
                    </MenuItem>
                    <MenuItem value="1" id={vault.vault_id}>
                      <Typography color="success.main">Approved</Typography>
                    </MenuItem>
                    <MenuItem value="2" id={vault.vault_id}>
                      <Typography color="error.main">Denied</Typography>
                    </MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
