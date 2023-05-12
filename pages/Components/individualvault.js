import React, { useState } from "react";
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
} from "@mui/material";

const initialVaults = [
  {
    id: 1,
    creatorId: 101,
    creditScore: 750,
    amount: 1000,
    interestRate: 5,
    creationDate: "2023-04-01",
    status: "Pending",
  },
  {
    id: 2,
    creatorId: 102,
    creditScore: 680,
    amount: 2000,
    interestRate: 6,
    creationDate: "2023-04-05",
    status: "Approved",
  },
  {
    id: 3,
    creatorId: 103,
    creditScore: 710,
    amount: 1500,
    interestRate: 4,
    creationDate: "2023-04-10",
    status: "Denied",
  },
  {
    id: 1,
    creatorId: 101,
    creditScore: 750,
    amount: 1000,
    interestRate: 5,
    creationDate: "2023-04-01",
    status: "Pending",
  },
  {
    id: 2,
    creatorId: 102,
    creditScore: 680,
    amount: 2000,
    interestRate: 6,
    creationDate: "2023-04-05",
    status: "Approved",
  },
  {
    id: 3,
    creatorId: 103,
    creditScore: 710,
    amount: 1500,
    interestRate: 4,
    creationDate: "2023-04-10",
    status: "Denied",
  },
  {
    id: 4,
    creatorId: 104,
    creditScore: 800,
    amount: 3000,
    interestRate: 7,
    creationDate: "2023-04-15",
    status: "Pending",
  },
  {
    id: 5,
    creatorId: 105,
    creditScore: 650,
    amount: 2500,
    interestRate: 5.5,
    creationDate: "2023-04-20",
    status: "Denied",
  },
  {
    id: 6,
    creatorId: 106,
    creditScore: 720,
    amount: 1200,
    interestRate: 6,
    creationDate: "2023-04-25",
    status: "Pending",
  },
  {
    id: 7,
    creatorId: 107,
    creditScore: 790,
    amount: 1800,
    interestRate: 6.5,
    creationDate: "2023-04-26",
    status: "Approved",
  },
  {
    id: 8,
    creatorId: 108,
    creditScore: 680,
    amount: 2200,
    interestRate: 7.5,
    creationDate: "2023-04-27",
    status: "Pending",
  },
  {
    id: 9,
    creatorId: 109,
    creditScore: 730,
    amount: 1400,
    interestRate: 4.5,
    creationDate: "2023-04-28",
    status: "Denied",
  },
  {
    id: 10,
    creatorId: 110,
    creditScore: 800,
    amount: 3500,
    interestRate: 6,
    creationDate: "2023-04-29",
    status: "Approved",
  },
];

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
  const [vaults, setVaults] = useState(initialVaults);

  const handleStatusChange = (event, vaultId) => {
    const newStatus = event.target.value;
    setVaults(
      vaults.map((vault) =>
        vault.id === vaultId ? { ...vault, status: newStatus } : vault
      )
    );
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
                  Creator Credit Score
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
            {vaults.map((vault) => (
              <TableRow key={vault.id}>
              <TableCell>{vault.id}</TableCell>
              <TableCell>{vault.creatorId}</TableCell>
              <TableCell>{vault.creditScore}</TableCell>
              <TableCell>{`$${vault.amount}`}</TableCell>
              <TableCell>{`${vault.interestRate}%`}</TableCell>
              <TableCell>{vault.creationDate}</TableCell>
              <TableCell>
                <Select
                  value={vault.status}
                  onChange={(e) => handleStatusChange(e, vault.id)}
                  sx={{ color: getStatusColor(vault.status) }}
                >
                  <MenuItem value="Pending">
                    <Typography color="warning.main">Pending</Typography>
                  </MenuItem>
                  <MenuItem value="Approved">
                    <Typography color="success.main">Approved</Typography>
                  </MenuItem>
                  <MenuItem value="Denied">
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