import axios from 'axios';

const instance = axios.create({
  baseURL: "https://stayfinder-backend-4qgs.onrender.com/api",
});

export default instance;
