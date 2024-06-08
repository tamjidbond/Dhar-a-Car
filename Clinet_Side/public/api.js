// api.js

export const fetchListings = async () => {
    try {
      const response = await fetch('http://localhost:5000/listing');
      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching listings:', error);
      throw error; // Propagate the error
    }
  };
  