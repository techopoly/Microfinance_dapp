import useMifiApi from '../hooks/useMifiApi';
import { useEffect, useState } from "react";
import { Container, Typography, Box, Paper, Grid, Divider,CircularProgress,CheckCircleIcon } from '@material-ui/core';
import { useRouter } from "next/router";
import Header from "../appbar";
import { green } from '@mui/material/colors';
import color from "../../styles/login.module.css"
const UserDetails = () => {
    const{web3, account, contract} = useMifiApi();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const router = useRouter();
    const userId = router.query.userid;


    useEffect(() => {
        const getUserInfo = async () => {
          try {
            console.log(contract);
            if (contract) {
                const staker = await contract.methods
                .address_staker(userId)
                .call({ from: account[0] });
              console.log("Staker Data : ", staker);
              setUser(staker);
              setLoading(false);
              
            }
          } catch (error) {
            console.log(error);
          }
        };
        getUserInfo();

        
      }, [contract]);

      if (loading) {
        return (
            <>
            <Header/>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
          </Box>
          </>
        );
      }


  return (
    <>
    <Header/>
    
    <Container maxWidth="md">
      <Box my={4}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          style={{
            color: '#3f51b5',
            marginBottom: '1.5rem',
            fontWeight: 700,
            fontSize: '2.2rem',
            marginTop: '2rem',
            textAlign: 'center',
            padding: '1.5rem',
            borderRadius: '10px',
            background: '#f5f5f5',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            border: '2px solid #3f51b5',
          }}
        >
          Staker Details
        </Typography>
        <Paper
          style={{
            padding: '1.5rem',
            borderRadius: '15px',
            backgroundColor: '#f5f5f5',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            border: '1px solid #ddd',
          }}
        >
          <Grid container spacing={3} style={{  marginTop: '5' }}>
            <Grid item xs={12}>
              <Typography variant="h6" style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                Staker Address
              </Typography>
              <Typography variant="body1">{userId}</Typography>
            </Grid>
            <Divider style={{ margin: '1.5rem 0' }} />
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                Staker Balance
              </Typography>
              <Typography variant="body1">{user.balance}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                reputation Score
              </Typography>
              <Typography variant="body1">{user.reputation_score}</Typography>
            </Grid>
            <Divider style={{ margin: '1.5rem 0' }} />
            <Grid item xs={12}>
              <Typography variant="h6" style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                NID Verification
              </Typography>
              <Typography  style={{ fontWeight: 600, marginBottom: '0.5rem',color:"green" }}>Verified </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
    </>
  );
};

export default UserDetails;
