import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const recommendBook = async (bookData) => {
    const formData = new FormData();
    formData.append('title', bookData.title);
    formData.append('description', bookData.description);
    formData.append('author', bookData.author);
    if (bookData.image) {
        formData.append('image', bookData.image);
    }

    const response = await axios.post(`${API_URL}/books/recommend`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getBooks = async () => {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
};
