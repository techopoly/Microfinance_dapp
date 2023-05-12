import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, CardActions, CardMedia, Box } from '@mui/material';
import { styled } from '@mui/system';
import Head from 'next/head';
import Link from 'next/link';

const LogoTypography = styled(Typography)({
  flexGrow: 1,
});

const HeaderWrapper = styled(AppBar)({
  backgroundColor: '#3f51b5',
});

const FooterWrapper = styled(Box)({
  backgroundColor: '#3f51b5',
  padding: '32px 0',
  color: '#fff',
  marginTop: 'auto',
});

const FooterLink = styled(Link)({
  color: '#fff',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

export default function Footer() {
  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">MicroLoan</Typography>
            <Typography variant="body2">
              Empowering people with collateral-free loans using blockchain technology.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Quick Links</Typography>
            <Typography>
              <FooterLink href="/how-it-works">How It Works</FooterLink>
            </Typography>
            <Typography>
              <FooterLink href="/about">About Us</FooterLink>
            </Typography>
            <Typography>
              <FooterLink href="/faq">FAQ</FooterLink>
            </Typography>
            <Typography>
              <FooterLink href="/contact">Contact Us</FooterLink>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Contact Info</Typography>
            <Typography>
              1234 Blockchain Ave <br />
              Bangladesh,Dhaka:1207
            </Typography>
            <Typography>Email: info@microloan.com</Typography>
            <Typography>Phone: +1 (555) 123-4567</Typography>
          </Grid>
        </Grid>
      </Container>
    </FooterWrapper>
  );
}
