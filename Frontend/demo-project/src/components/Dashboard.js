import React, { useState } from 'react';
import { Button } from '@mui/material';
import RecommendBookPopup from './RecommendBookPopup';

const Dashboard = () => {
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <div>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleOpenPopup}
        style={{ margin: '20px' }}
      >
        Recommend New Book
      </Button>

      <RecommendBookPopup 
        open={openPopup} 
        onClose={handleClosePopup} 
      />
    </div>
  );
};

export default Dashboard;
