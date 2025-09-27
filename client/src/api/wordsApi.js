import axios from 'axios';

const API_URL = '/api/words';

export const fetchWords = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching words:', error);
    return { words: [], page: 1, totalPages: 0, totalWords: 0 };
  }
};

export const updateWordStatus = async (id, newStatus) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { status: newStatus });
    return response.data;
  } catch (error) {
    console.error('Error updating word status:', error);
    throw error;
  }
};