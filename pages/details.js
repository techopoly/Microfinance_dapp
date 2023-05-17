import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, Grid, Divider, CircularProgress } from '@mui/material';

const UserDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulating data fetch
    setTimeout(() => {
      const userData = {
        user_address: '123 Main St',
        balance: '1000',
        credit_score: '750',
        is_nid_verified: 'Yes',
      };
      setUser(userData);
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
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
          User Details
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
          <Grid container spacing={3} style={{ marginTop: '5' }}>
            <Grid item xs={12}>
              <Typography variant="h6" style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                User Address
              </Typography>
              <Typography variant="body1">{user.user_address}</Typography>
            </Grid>
            <Divider style={{ margin: '1.5rem 0' }} />
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                User Balance
              </Typography>
              <Typography variant="body1">{user.balance}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                Credit Score
              </Typography>
              <Typography variant="body1">{user.credit_score}</Typography>
            </Grid>
            <Divider style={{ margin: '1.5rem 0' }} />
            <Grid item xs={12}>
              <Typography variant="h6" style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                NID Verification
              </Typography>
              <Typography variant="body1">{user.is_nid_verified}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      </Container>
);
};

export default UserDetailsPage;