import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

interface ActionAreaCardProps {
  image: string;
  title: string;
  description: string;
}

export default function ActionAreaCard({ image, title, description }: ActionAreaCardProps) {
  return (
    <Card sx={{ 
      maxWidth: '100%',
      borderRadius: '16px',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <CardActionArea
        onClick={() => {
          console.log('Card clicked!');
        }}
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start'
        }}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{
            objectFit: 'cover',
            width: '100%'
          }}
        />
        <CardContent sx={{ 
          flexGrow: 1,
          padding: '20px',
          width: '100%'
        }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ 
            fontWeight: 600,
            fontSize: '1.25rem',
            color: '#1F2937',
            mb: 2
          }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ 
            color: '#4B5563',
            fontSize: '0.95rem',
            lineHeight: 1.5
          }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}