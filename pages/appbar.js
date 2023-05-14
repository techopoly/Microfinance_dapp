import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/material/styles";
import { useRouter } from 'next/router';
import useWeb3Api from "./hooks/useWeb3Api";


const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: 1,
  },
}));

export default function AppHeader() {

  const classes = useStyles();
  const router = useRouter();
  const {web3, account, contract} = useWeb3Api();


  const handleOptionClick = (option) => {
    router.push(`/${option}`);
  };


  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.logo} onClick={() => handleOptionClick('')}>
          MicroLoan
        </Typography>
        <nav>
       
         <Button color="inherit">My Website</Button>
          <Button color="inherit" >About Us</Button>
          <Button color="inherit">Apply for Loan</Button>
          <Button color="inherit">FAQ</Button>
          <Button color="inherit" onClick={() => handleOptionClick('verify')}>Verify</Button>
          <Button color="inherit" onClick={() => handleOptionClick('dashboard')}>Protocol Manager</Button>
          <Button variant="outlined" color="inherit">{account? "Connected": 'Connect Metamask'}</Button>
          {account && <Button variant="outlined" color="inherit">{account}</Button>}
        </nav> 
      </Toolbar>
      
    </AppBar>
  );
}
