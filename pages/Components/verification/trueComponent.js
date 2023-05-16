import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';

const VerifiedCard = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: 30, height: '100vh' }}>
      <Card style={{ minWidth: 300, border: '2px solid #ddd', borderRadius: 10 }}>
        <CardContent style={{ textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: green[500] }} />
          <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
           Thank You! You are Verified Now
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifiedCard;
