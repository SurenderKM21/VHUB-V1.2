import { useState ,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const MediaCard2 = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/bookings/get', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('TOKEN :', localStorage.getItem('token')); // Log the data
        if (!response.ok) throw new Error('Failed to fetch bookings');

        const bookingsData = await response.json();
        console.log('Bookings Data:', bookingsData); // Log the data
        setBookings(bookingsData); // Ensure this is the correct data structure
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

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
        {bookings.length} Bookings
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MediaCard2;
