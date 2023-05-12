import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, CardActions, CardMedia, Box } from '@mui/material';
import { styled } from '@mui/system';
import Head from 'next/head';
import Link from 'next/link';
import Footer from './footer';

const LogoTypography = styled(Typography)({
  flexGrow: 1,
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>MicroLoan</title>
        <meta name="description" content="Blockchain powered microfinance platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <LogoTypography variant="h6">
            MicroLoan
          </LogoTypography>
          <nav>
            <Button color="inherit">How It Works</Button>
            <Button color="inherit">About Us</Button>
            <Button color="inherit">Apply for Loan</Button>
            <Button color="inherit">FAQ</Button>
            <Button variant="outlined"color="inherit">Connect Metamask</Button>
          </nav>
        </Toolbar>
      </AppBar>

      <Box className="hero-section" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `url('/path/to/your/background-image.jpg')`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <Container maxWidth="lg">
          <Grid container alignItems="center" justify="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom>
                Empowering You with Collateral-Free Loans
              </Typography>
              <Typography variant="subtitle1">
                Harnessing the power of blockchain technology to revolutionize microfinance
              </Typography>
              <Button variant="contained" color="primary">
                Apply Now
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" className="services-section">
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://loanscanada.ca/wp-content/uploads/2017/05/Borrowing_money.jpg"
                alt="Borrower"
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Borrow Money
                </Typography>
                <Typography variant="body1">
                  Access collateral-free loans with competitive interest rates through our secure blockchain platform.
                </Typography>
              </CardContent>
              <CardActions>
                <Link href="/borrower" passHref>
                  <Button variant="contained" color="primary">
                    Get Started
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://learn.eforms.com/wp-content/uploads/2020/08/16_9-Get-paid-back.png"
                alt="Lender"
              />
              <CardContent>
              <Typography variant="h5" gutterBottom>
                  Lend Money
                </Typography>
                <Typography variant="body1">
                  Earn attractive returns by lending your money to creditworthy borrowers on our secure platform.
                </Typography>
              </CardContent>
              <CardActions>
                <Link href="/lend" passHref>
                  <Button variant="contained" color="primary">
                    Get Started
                  </Button>
                </Link>
              </CardActions>
              
              
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://www.pngkit.com/png/full/49-495738_custom-color-handshake-icon-free-handshake-icons-business.png"
                alt="Lender"
              />
              <CardContent>
              <Typography variant="h5" gutterBottom>
                  Become a staker
                </Typography>
                <Typography variant="body1">
                Stake Your Money and Earn with MicroLoan's Decentralized Lending Platform
                </Typography>
              </CardContent>
              <CardActions>
                <Link href="/staker" passHref>
                  <Button variant="contained" color="primary">
                    Get Started
                  </Button>
                </Link>
              </CardActions>
              
              
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer/>

      {/* Add other sections (Testimonials, FAQ) and footer here */}
    </div>
  );
}
