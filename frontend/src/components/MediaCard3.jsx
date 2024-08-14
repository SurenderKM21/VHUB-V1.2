import { useState ,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const MediaCard3 = () => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    tech_id: '',
    name: '',
    phone: '',
    expert: '',
    gender: '',
    email: '',
    age: '',
    experience: '',
    joindate: '',
    address: '',
    password: '',
  });

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await fetch('http://localhost:8080/Technicians', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch technicians');

        const servicesData = await response.json();
        setTechnicians(servicesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching technicians:', error);
        setError('Failed to load technicians');
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://cdn-icons-png.flaticon.com/512/6342/6342703.png"
        title="green iguana"
      />
      <CardContent sx={{width:200}}>
        <Typography gutterBottom variant="h5" component="div">
          Technicians
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {technicians.length} Technicians
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MediaCard3;
