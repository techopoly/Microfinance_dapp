import React from 'react';
import { Card, CardContent, CardMedia, Button, Grid,Typography } from '@material-ui/core';
import Link from 'next/link';

const VaultManagementPage = () => {
  return (
    <Grid container spacing={5} justify="center" >
      <Grid item xs={10} sm={6}>
        <Card>
          <CardMedia
            component="img"
            alt="Individual Vault Image"
            height="200"
            image="https://www.kotak.com/content/dam/Kotak/article-images/4-tips-to-get-the-best-personal-loan-interest-rates-desk.jpg"
            title="Individual Vault"
          />
          <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Individual Vault
        </Typography>
        <Link href="/individualadmin" passHref> 
            <Button variant="contained" color="primary">Continue...</Button>
        </Link>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardMedia
            component="img"
            alt="Group Vault Image"
            height="200"
            image="https://www.preferredbank.com/assets/files/MgcZzqlN/subad_businesssolutions.jpg"
            title="Group Vault"
          />
          <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Group Vault
        </Typography>
        <Link href="/groupadmin" passHref> 
            <Button variant="contained" color="primary">Continue...</Button>
            </Link>
          </CardContent>
          
        </Card>
      </Grid>
    </Grid>
  );
};

export default VaultManagementPage;
