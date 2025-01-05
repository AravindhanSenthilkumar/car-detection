import React from 'react';
import { Typography, List, ListItem, Container } from '@mui/material';
import Button from '@mui/material/Button';

const CardDetails = () => {
  const points = [
    "Point 1", "Point 2", "Point 3", "Point 4", "Point 5",
    "Point 6", "Point 7", "Point 8", "Point 9", "Point 10",
    "Point 11", "Point 12", "Point 13", "Point 14", "Point 15",
    "Point 16", "Point 17", "Point 18", "Point 19", "Point 20"
  ];

  return (
    <Container>
        <div> <h3>Main Heading</h3></div>
     
    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        Overall Accuracy : 5%
    </Typography>
    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
    Overall Loss : 5%
    </Typography>
    <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 14 }}>
       Its trained only on below car models 
    </Typography>
      <List>
        {points.map((point, index) => (
            <span key={index}>{point}, </span>
        ))}
      </List>
    </Container>
  );
};

export default CardDetails;
