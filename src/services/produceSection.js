// services/produceSection.js
import axios from 'axios';

const BASE_URL = 'https://dummy.restapiexample.com/api/v1/create';

// export const fetchProduceData = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/produce`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching produce data:', error);
//     throw error;
//   }
// };

export const createProduceItem = async (newProduceItem) => {
  try {
    const response = await axios.post(`${BASE_URL}/produce`, newProduceItem);     
    return response.data;
  } catch (error) {
    console.error('Error creating produce item:', error);
    throw error;
  }
};

// You can add more API-related functions for the produce section here
