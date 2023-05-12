import React, { useState } from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Header from "./appbar";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
  Container,
} from '@mui/material';

import { PhotoCamera } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: 'center',
  },
  cardIcon: {
    fontSize: '3rem',
    color: theme.palette.primary.main,
  },
  uploadButton: {
    marginTop: theme.spacing(2),
  },
  progress: {
    margin: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
}));

const VerificationPage = () => {
  const classes = useStyles();
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsSubmitted(true);
    }, 2000); // simulate upload time
  };

  const handleSubmit = () => {
    setIsSubmitted(false);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    
    <>
    <div>
      <Header/>
    </div>
    <Container maxWidth="sm" style={{ paddingTop: '64px' }}>
      <Card className={classes.card}>
        <CardHeader title="Identification Verification" />
        <CardContent>
          <PhotoCamera className={classes.cardIcon} />
          <Typography variant="body1" style={{ marginTop: '16px' }}>
            Please upload a photo of your identification card to verify your identity.
          </Typography>
          <input
            accept="image/*"
            className={classes.input}
            id="verification-file"
            type="file"
            onChange={handleUpload}
          />
          <label htmlFor="verification-file">
            <Button
              variant="contained"
              component="span"
              color="primary"
              className={classes.uploadButton}
              startIcon={<PhotoCamera />}
            >
              {isUploading ? <CircularProgress size={24} className={classes.progress} /> : 'Upload'}
            </Button>
          </label>
          {isSubmitted && (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Verification Completed</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Your identification has been verified successfully.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
    </>
  );
};

export default VerificationPage;
