import axios from 'axios';

const PEXELS_API_KEY = 'kXlqn7SbgPDedYsmmOB6p3SIq9zYjkZYeGgUjz7ctX5AUEs3zJHFFDgS'; // Replace with your Pexels API Key

export const fetchImages = async (industry:any) => {
  try {
    const response = await axios.get('https://api.pexels.com/v1/search', {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
      params: {
        query: industry,
        per_page: 1, // Number of images to fetch
      },
    });
    return response.data.photos[0]?.src?.medium || ''; // Returns the URL of the first image
  } catch (error) {
    console.error('Error fetching images from Pexels:', error);
    return ''; // Return a default image URL or an empty string if there's an error
  }
};
