import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import useMifiApi from "./hooks/useMifiApi";
import Web3 from "web3";
import {Modal, TextField, Paper, Grid } from '@material-ui/core';
import Rightbar from "./sidebar"
import styles from '../styles/nav.module.css';

const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: 1,
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
}));

export default function AppHeader() {
  const isActive = (pathname) => router.pathname === pathname;
  const classes = useStyles();
  const router = useRouter();
  const { web3, account, contract } = useMifiApi();
  const [balance, setBalance] = useState(null);
  const [user, setUser] = useState([]);
  ////////////////confirm ////////////////
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  ///////////////////////////////////////

  const handleOptionClick = (option) => {
    router.push(`/${option}`);
  };

  const Click = (option) => {
    router.push(`/${option}/${account}`);
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

  const addBalance = async (value,type) => {
    const weiAmount = Web3.utils.toWei(value, "ether");
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
/////////////////////////////////confirm//////////////////////////
const handleOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  setAmount('');
};

const handleAmountChange = (event) => {
  setAmount(event.target.value);
};


const handleConfirm = () => {
  console.log(`Confirmed adding balance of ${amount}`);
  addBalance(amount, type);
  handleClose();
};
////////////////////////////////////////////////////////////////////
  return (
    <>
   
    <nav className={styles.navbar}>
            <div onClick={() => router.push('/')} className={styles.navbar_brand}>
                MicroLoan
            </div>

            <div className={styles.navbar_items}>
                <div onClick={() => router.push('/')} className={isActive('/home') ? styles.active : styles.navbar_item}>
                    Home
                </div>
               
                {account && (
                <div onClick={() => Click("user")} className={isActive('/services') ? styles.active : styles.navbar_item}>
                     {account}
                </div>
                 )}
                  {balance && (
                <div onClick={() => Click("user")}  className={isActive('/contact') ? styles.active : styles.navbar_item}>
                     {`Balance: ` + balance + ` BDT`}
                </div>
                  )}
                   {user.user_address && (
                    <div onClick={signUp} className={isActive('/home') ? styles.active : styles.navbar_item}>
                    Sign Up 
                </div>
                )}
                <div onClick={handleOpen} className={isActive('/home') ? styles.active : styles.navbar_item}>
                    Add Balance
                </div>
                <div onClick={() => router.push('/about')} className={isActive('/about') ? styles.active : styles.navbar_item }>
                  {account ? "Connected "  : "Connect Metamask"} <span className={styles.dot}></span>
                </div>
            </div>
            <div >
                    <Rightbar/>
              </div>
        </nav>

    <div>
     
      <Modal open={open} onClose={handleClose}>
        <Paper className={classes.paper}>
          <h2 id="conversion-modal-title">Add Balance</h2>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="number"
                label="Enter Amount"
                value={amount}
                onChange={handleAmountChange}
                fullWidth
              />
               <TextField
                type="text"
                label="What type of user you are "
                value={type}
                onChange={(event) => {
                  setType(event.target.value)}}
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
}
