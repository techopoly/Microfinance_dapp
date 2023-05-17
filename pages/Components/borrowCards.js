import { Card, CardContent, CardActions, Typography, Button, CardMedia } from '@mui/material';
import Link from 'next/link';

const FullWidthCard = ({ title, imageSrc ,url}) => {
  return (
    <>

    <Card sx={{ minWidth: '100%', marginBottom: '2rem' }}>
      <CardMedia
        component="img"
        height="300"
        image={imageSrc}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
      <Link href={url} passHref> 
        <Button size="small" variant="contained" color="primary">
          Continue
        </Button>
        </Link>
      </CardActions>
    </Card>
    </>
  );
};

const BorrowCards = () => {
  return (
    <div>
      <FullWidthCard
        title="Individual Borrowers"
        imageSrc="https://www.kotak.com/content/dam/Kotak/article-images/4-tips-to-get-the-best-personal-loan-interest-rates-desk.jpg"
        url="/individualBorrow"
      />
      <FullWidthCard
        title="Group Borrowers"
        imageSrc="https://www.preferredbank.com/assets/files/MgcZzqlN/subad_businesssolutions.jpg"
        url="/groupBorrow"
      />
    </div>
  );
};

export default BorrowCards;
