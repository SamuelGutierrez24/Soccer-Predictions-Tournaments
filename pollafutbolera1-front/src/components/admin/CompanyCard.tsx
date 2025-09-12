import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Box, CardActions } from '@mui/material';
import { Company } from '@/src/interfaces/company.interface';

interface CompanyCardProps {
  image: string;
  name: string;
  address: string;
  nit: string;
  contact: string;
  company?: Company; // Full company object for edit/delete operations
  onEdit?: (company: Company) => void;
  onDelete?: (company: Company) => void;
}

export default function CompanyCard({ 
  image, 
  name, 
  address, 
  nit, 
  contact, 
  company, 
  onEdit, 
  onDelete 
}: CompanyCardProps) {
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit && company) {
      onEdit(company);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && company) {
      onDelete(company);
    }
  };

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
          console.log('Company card clicked:', name);
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
          height="10"
          image={image}
          alt={name}
          sx={{
            objectFit: 'cover',
            width: '50%',
            alignSelf: 'center'
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
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <BusinessIcon color="primary" fontSize="small" />
            {name}
          </Typography>
          
          <Typography variant="body2" sx={{ 
            color: '#4B5563',
            fontSize: '0.95rem',
            lineHeight: 1.8,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            mb: 1
          }}>
            <LocationOnIcon color="action" fontSize="small" />
            {address}
          </Typography>
          
          <Typography variant="body2" sx={{ 
            color: '#4B5563',
            fontSize: '0.95rem',
            lineHeight: 1.8,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            mb: 1
          }}>
            <ReceiptIcon color="action" fontSize="small" />
            NIT: {nit}
          </Typography>
          
          <Typography variant="body2" sx={{ 
            color: '#4B5563',
            fontSize: '0.95rem',
            lineHeight: 1.8,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <ContactPhoneIcon color="action" fontSize="small" />
            {contact}
          </Typography>
        </CardContent>
      </CardActionArea>
      
      {onEdit && onDelete && (
        <CardActions sx={{ justifyContent: 'flex-end', padding: '8px 16px' }}>
          <Box onClick={(e) => e.stopPropagation()}>
            <IconButton 
              color="primary" 
              aria-label="editar empresa" 
              onClick={handleEdit}
              size="small"
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              color="error" 
              aria-label="eliminar empresa" 
              onClick={handleDelete}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardActions>
      )}
    </Card>
  );
}
