import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Typography,  Dialog,
  DialogTitle,
  DialogActions,
 } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import useMifiApi from "./hooks/useMifiApi";
import Web3 from "web3";
import {Modal, TextField, Paper, Grid } from '@material-ui/core';
import Rightbar from "./sidebar"
import styles from '../styles/nav.module.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';


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
  const [amount, setAmount] = useState(0);
  ///////////////////////////////////////
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const conversionRate = 193207.53; //
  const [ethAmount, setEthAmount] = useState(0);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
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
    getUserInfo();
  }, [contract]);

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

  const addBalance = async (value) => {
    //const valueInString = value.toString();
    console.log(value);
    //const weiAmount = Web3.utils.toWei(valueInString, "ether");
    try {
      console.log(contract);
      if (contract) {
        const balance = await contract.methods
          .add_balance('user')
          .send({ from: account[0], value: value });
        setBalance(
          await contract.methods.get_balance().call({ from: account[0] })
        );
      }
      setIsDialogOpen(true);
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
          getUserInfo();
      }
      setIsDialogOpen(true);
    
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
  setEthAmount(bdtToEth(event.target.value))
};


const handleConfirm = () => {
  console.log(`Confirmed adding balance of ${amount}`);
  addBalance(amount);
  handleClose();
};

const weiToEth = (weiValue) => {
  console.log(weiValue)
  const valueInString = weiValue.toString();
  return Web3.utils.fromWei(valueInString, "ether");
};

const ethToBdt = (ethAmount) => {
  return ethAmount * conversionRate;
};

const bdtToEth = (bdtAmount)=>{
  return bdtAmount/conversionRate;
}

const isSignedUp = (address)=>{
  if(address === '0x0000000000000000000000000000000000000000'){
    return false;
  }else{
    return true;
  }
}
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
                   {user ? !isSignedUp(user.user_address) && (
                    <div onClick={signUp} className={isActive('/home') ? styles.active : styles.navbar_item}>
                    Sign Up 
                </div>
                ) : 'Blockchain not Connected'}
           
                <div onClick={handleOpen} className={isActive('/home') ? styles.active : styles.navbar_item}>
                    Add Balance
                </div>
                {user ? isSignedUp(user.user_address) && (
                    <div onClick={() => router.push('/userLoan')} className={styles.navbar_item}>
                    My Loans
                </div>
                ) : 'Blockchain not Connected'}
                <div onClick={() => router.push('/about')} className={isActive('/about') ? styles.active : styles.navbar_item }>
                  {account ? "Connected "  : "Connect Metamask"} <span className={styles.dot}></span>
                </div>
            </div>
            <div >
                    <Rightbar/>
              </div>
        </nav>
    <div>

      {/* && (
                    <div onClick={signUp} className={isActive('/home') ? styles.active : styles.navbar_item}>
                    Sign Up 
                </div> : 'Blockchain not Conne'
                ) */}
     
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
              <p>ETH: {ethAmount}</p>
               {/* <TextField
                type="text"
                label="What type of user you are "
                value={type}
                onChange={(event) => {
                  setType(event.target.value)}}
                fullWidth
              /> */}
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
    <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle sx={{ fontSize: 30 }}>Success<CheckCircleIcon sx={{ fontSize: 30, color: green[500] }} /></DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
