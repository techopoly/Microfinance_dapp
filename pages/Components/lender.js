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

const LoanCards = () => {
  return (
    <div>
      <FullWidthCard
        title="Individual Lenders"
        imageSrc="/images/individual.png"
        url="/individual"
      />
      <FullWidthCard
        title="Group Lenders"
        imageSrc="/images/group.png"
        url="/group"
      />
    </div>
  );
};

export default LoanCards;
