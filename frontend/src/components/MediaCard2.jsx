import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const MediaCard2 = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://cdn-icons-png.flaticon.com/512/7050/7050939.png"
        title="green iguana"
      />
      <CardContent sx={{width:200}}>
        <Typography gutterBottom variant="h5" component="div">
          Bookings
        </Typography>
        <Typography variant="body2" color="text.secondary">
        3 Bookings
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MediaCard2;
