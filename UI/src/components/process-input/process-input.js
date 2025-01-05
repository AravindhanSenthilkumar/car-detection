import React from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';

const ImageUploadPage = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Waiting for Image Input
      </Typography>
      
      {/* Loading Spinner */}
      <CircularProgress sx={{ marginBottom: 2 }} />
      
      {/* Text Message */}
      <Typography variant="body1">
        Please select / upload an image to proceed.
      </Typography>
    </Box>
  );
};

export default ImageUploadPage;
