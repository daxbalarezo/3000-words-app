import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development';
const API_BASE = isDevelopment ? 'http://localhost:5000' : '';
const API_URL = `${API_BASE}/api/words`;

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

export const getLearnedStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats/learned`);
    return response.data;
  } catch (error) {
    console.error('Error fetching learned stats:', error);
    return { learned: 0, total: 0, pending: 0 };
  }
};