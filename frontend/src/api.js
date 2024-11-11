import axios from 'axios';

const API_URL = 'http://localhost:5000/api/transactions';

// Initialize the database
export const initializeDatabase = () => axios.get(`${API_URL}/initialize`);

// Fetch transactions 
export const getTransactions = (month, page = 1, perPage = 10, search = '') =>
  axios.get(`${API_URL}`, {
    params: { month, page, perPage, search },
  });

//monthly statistics for transactions 
export const getStatistics = (month) => axios.get(`${API_URL}/statistics`, { params: { month } });

//price range data for a bar chart 
export const getPriceRange = (month) => axios.get(`${API_URL}/price-range`, { params: { month } });

//category counts for a pie chart
export const getCategoryCount = (month) => axios.get(`${API_URL}/category-count`, { params: { month } });
