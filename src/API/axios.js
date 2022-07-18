import axios from 'axios';

// api url
export const url = process.env.REACT_APP_SERVER_URL;

// instance of axios to use it everywhere
export const instance = axios.create({
  baseUrl: url,
});

