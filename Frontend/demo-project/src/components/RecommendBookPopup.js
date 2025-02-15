import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Input
} from '@mui/material';
import { recommendBook } from '../services/book-services';

const RecommendBookPopup = ({ open, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prevState => ({
        ...prevState,
        image: file
      }));
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.title.trim() || !formData.description.trim() || !formData.author.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setError('');
      setIsSubmitting(true);
      await recommendBook(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting book:', error);
      setError(error.response?.data?.message || 'Failed to submit book recommendation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Recommend New Book</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Fill in the details of the new book
        </Typography>
        
        <TextField
          fullWidth
          margin="normal"
          label="Book Title"
          name="title"
          placeholder="Enter book title"
          value={formData.title}
          onChange={handleInputChange}
        />
        
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          name="description"
          placeholder="Enter book description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
        />
        
        <TextField
          fullWidth
          margin="normal"
          label="Author Name"
          name="author"
          placeholder="Enter author name"
          value={formData.author}
          onChange={handleInputChange}
        />
        
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
        />
        {formData.image && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Selected image: {formData.image.name}
          </Typography>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button 
          onClick={onClose} 
          color="primary"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          variant="contained"
          disabled={isSubmitting || !formData.title.trim() || !formData.description.trim() || !formData.author.trim()}
          startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecommendBookPopup;
