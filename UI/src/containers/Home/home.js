import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Container, Grid, Paper } from '@mui/material';
import axios from 'axios';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IconButton } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import img from '../../assets/images/car-make-model-1.jpg';
import Panel from '../Panel/panel';
import './home.css';
import SecondaryPanel from '../Secondary-panel/secondary-panel';

  
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

function Home() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const [allimages, setAllImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const fileInputRef = useRef(null);
  
    useEffect(() => {
      // Fetch images from the backend
      axios.get("http://localhost:8000/api/images/") // Replace with your backend URL
        .then((response) => {
          setAllImages(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load images");
          setLoading(false);
        });
    }, []);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
  
  
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        handleUpload(file);
      }
  
    };
  
    const handleClose = () => {
      console.log('Close button clicked');
    };
  
    const handleButtonClick = () => {
      fileInputRef.current.click(); // Trigger the file input dialog
    };
  
    const handleUpload = async (imageFile) => {
      if (!imageFile) {
        setMessage("Please select an image first.");
        return;
      }
  
      const formData = new FormData();
      formData.append("image", imageFile);
  
      try {
        const response = await axios.post('http://localhost:8000/api/upload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage("Upload successful!");
        console.log(response.data);
      } catch (error) {
        setMessage("Upload failed. Please try again.");
        console.error(error);
      }
    };
  
    return (
        <div className='background'>
            <Container>
                <Grid container>
                    <Grid container item xs={12} >
                        <Grid item xs={12}  sm={9}>
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="Car Classification" {...a11yProps(0)} />
                                        <Tab label="Car Object deduction" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0} className="tab-content">
                                    <Panel></Panel>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1} className="tab-content">
                                    <SecondaryPanel></SecondaryPanel>
                                </CustomTabPanel>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Paper className='gallery-section unset-border-radius'>
                                <Stack direction="row" className='gallery-title-section'>
                                    <div>Gallery</div>
                                </Stack>
                            </Paper>
                            <Paper className='grid-left-section scrollable unset-border-radius'>
                            <div className='grid-left-section-image-container'>
                                {allimages.map((img) => (
                                <div key={img.id} className='grid-left-section-image-section'>
                                    {/* <div className='image-tag'>Tag</div> */}
                                    <img src={`http://127.0.0.1:8000${img.url}`} alt={`Image ${img.id}`} className='grid-left-section-image' />
                                    <IconButton className='grid-left-section-image-section-close' onClick={handleClose}>
                                    <CloseOutlinedIcon />
                                    </IconButton>
                                </div>
                                ))}
                            </div>
                            </Paper>
                            <Paper className='grid-left-bottom-section unset-border-radius'>
                            <Stack direction="row">
                                <input type="file" ref={fileInputRef} onChange={handleImageChange} className='grid-left-bottom-section-browse-button' />
                                <Button variant="contained" className='btn-bg'  onClick={handleButtonClick}>Upload</Button>
                                <p>{message}</p>
                            </Stack>
                        </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Home;