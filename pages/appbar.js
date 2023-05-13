import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/material/styles";
import { useRouter } from 'next/router';
import Link from 'next/link';
import getWeb3 from './Components/getWeb3';
import mifiContract from '../public/contract/Mifi.json';

const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: 1,
  },
}));

export default function AppHeader() {

  const classes = useStyles();
  const router = useRouter();
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);


  useEffect(() => {
    const init = async () => {
      try {
        const { web3Instance } = await getWeb3();
        const object = await getWeb3();
        console.log(object);
        const accounts = await web3Instance.eth.getAccounts();
        console.log("acc:", accounts);
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = mifiContract.networks[networkId];
        const instance = new web3Instance.eth.Contract(
          mifiContract.abi,
          deployedNetwork && deployedNetwork.address
        );

        setWeb3(web3Instance);
        setAccounts(accounts);
        setContract(instance);
      } catch (error) {
        alert("Failed to load web3, accounts, or contract.");
        console.error(error);
      }
    };

    init();

  }, []);
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
          <Button variant="outlined" color="inherit">{accounts? "Connected": 'Connect Metamask'}</Button>
          {accounts && <Button variant="outlined" color="inherit">{accounts}</Button>}
        </nav> 
      </Toolbar>
      
    </AppBar>
  );
}
