import './secondary-panel.css';
import { Container, Grid, Paper } from '@mui/material';
import React, { useState } from 'react';
import OutlinedCard from '../../components/cards/card';
import CardDetails from '../../components/cards-with-details/card-with-details';
import Button from '@mui/material/Button';
import ImageUploadPage from '../../components/process-input/process-input';

const SecondaryPanel = () => {
  const [selectedCard, setSelectedCard] = useState(true); // Track which card is selected
  const [showCardDetails, setShowCardDetails] = useState(false); // Show card details section
  const [showImageUpload, setShowImageUpload] = useState(false); // Show image upload section
  const [buttonsEnabled, setButtonsEnabled] = useState(false); // Enable/Disable buttons
  const [backbuttonEnabled, setbackbuttonEnabled] = useState(true); // Enable/Disable buttons
  const [usebuttonEnabled, setusebuttonEnabled] = useState(true); // Enable/Disable buttons
  
  const handleCardClick = () => {
    setSelectedCard(false);  // Indicate that a card has been clicked
    setShowCardDetails(true);  // Show card details
    setButtonsEnabled(true);  // Enable buttons
    setbackbuttonEnabled(true);
    setusebuttonEnabled(true);
  };

  const handleUseClick = () => {
    setShowCardDetails(false);  // Hide card details
    setShowImageUpload(true);   // Show image upload section
    setusebuttonEnabled(false);
    setbackbuttonEnabled(true);
  };

  const handleBackClick = () => {
    setShowCardDetails(false); 
    setSelectedCard(true);  // Hide card details
    setShowImageUpload(false);   // Show image upload section
    setButtonsEnabled(false); 
  };

  return (
    <Container className='parent-container'>
      <Grid container className='grid-container'>
        <Grid container item xs={12} className='middle-grid'>
          <Paper className='grid-right-section unset-border-radius'>
            <div className='grid-right-section-inner-container'>
              {/* Initially show the pre-trained models */}
              {selectedCard && (
                <div className='pre-trained-model'> 
                  <div className='trained-title'>
                    <h3>Trained models</h3>
                  </div>
                  <div className='models-section scrollable'>
                    <div className='cards-section'>
                      {[...Array(9)].map((_, index) => (
                        <div className='individual-card' key={index} onClick={handleCardClick} >
                             <OutlinedCard  />
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Card details section is shown when a card is selected */}
              {showCardDetails && (
                <div className='cards-details-section scrollable'>
                  <CardDetails></CardDetails>
                </div>
              )}

              {/* Image upload section is shown after clicking the "Use" button */}
              {showImageUpload && (
                <div className='waiting-for-image scrollable'>
                  <ImageUploadPage></ImageUploadPage>
                </div>
              )}
            </div> 
          </Paper>
        </Grid>

        <Grid container item xs={12}>
          <Paper className='grid-left-botton-container unset-border-radius'>
            <div className='grid-left-bottom-section'>
              {/* Initially hide the buttons */}
              {buttonsEnabled && (
                <>
                 {backbuttonEnabled && (
                  <>
                  <Button variant="text"  onClick={handleBackClick}>Back</Button>
                  </>
                 )}
                  {usebuttonEnabled && (
                  <>
                   <Button variant="contained" onClick={handleUseClick}>Use</Button>
                  </>
                 )}
                </>
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SecondaryPanel;
