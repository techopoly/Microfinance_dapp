import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import useMifiApi from "./hooks/useMifiApi";
import Web3 from "web3";

const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: 1,
  },
}));

export default function AppHeader() {
  const classes = useStyles();
  const router = useRouter();
  const { web3, account, contract } = useMifiApi();
  const [balance, setBalance] = useState(null);
  const [user, setUser] = useState([]);

  const handleOptionClick = (option) => {
    router.push(`/${option}`);
  };

  useEffect(() => {
    const getBalance = async () => {
      try {
        console.log(contract);
        if (contract) {
          const balance = await contract.methods
            .get_balance()
            .call({ from: account[0] });
          console.log("balance: ", balance);
          setBalance(balance);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBalance();
  }, [contract]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        console.log(contract);
        if (contract) {
          const user = await contract.methods
            .show_user()
            .call({ from: account[0] });
            setUser(user);
        }
        console.log('user: ', user)
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, [contract]);

  const addBalance = async (type, value) => {
    const weiAmount = Web3.utils.toWei("1", "ether");
    try {
      console.log(contract);
      if (contract) {
        const balance = await contract.methods
          .add_balance(type)
          .send({ from: account[0], value: weiAmount });
        setBalance(
          await contract.methods.get_balance().call({ from: account[0] })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async () => {
    try {
      console.log(contract);
      if (contract) {
        const response = await contract.methods
          .add_user()
          .send({ from: account[0] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          className={classes.logo}
          onClick={() => handleOptionClick("")}
        >
          MicroLoan
        </Typography>
        <nav>
          <Button color="inherit">My Website</Button>
          <Button color="inherit">About Us</Button>
          <Button color="inherit">Apply for Loan</Button>
          <Button color="inherit">FAQ</Button>
          <Button color="inherit" onClick={() => handleOptionClick("verify")}>
            Verify
          </Button>
          <Button
            color="inherit"
            onClick={() => handleOptionClick("dashboard")}
          >
            Protocol Manager
          </Button>
          <Button variant="outlined" color="inherit">
            {account ? "Connected" : "Connect Metamask"}
          </Button>
          {account && (
            <Button variant="outlined" color="inherit">
              {account}
            </Button>
          )}
          {balance && (
            <Button variant="outlined" color="inherit">
              {`Balance: ` + balance + ` BDT`}
            </Button>
          )}
          {balance && (
            <Button
              onClick={() => addBalance("user")}
              variant="outlined"
              color="inherit"
            >
              Add Balance
            </Button>
          )}
          {!user.user_address && (
            <Button onClick={signUp} variant="outlined" color="inherit">
              Sign Up
            </Button>
          )}
        </nav>
      </Toolbar>
    </AppBar>
  );
}
