import axios from 'axios';
import apiUrl from '../env';

// export default function theAxios() {
// new code for docker-compose

//   if (window.location.origin === 'http://localhost:3000') {
//     axios.defaults.baseURL = 'http://127.0.0.1:8000';
//   }
//   axios.defaults.baseURL = window.location.origin;
//   return axios.defaults.baseURL;
// }

// export default axios.create({
//   baseURL: `${window.location.origin}`,
// });
export default axios.create({
  baseURL: apiUrl,
});

export const gecko = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});
