// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/chat', // URL của backend
});

export default api;