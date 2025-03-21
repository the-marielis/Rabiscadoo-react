import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3306',  
  timeout: 10000,  // Tempo limite de 10 segundos para a requisição
  headers: { 'Authorization': 'Bearer seu_token' }
});

export default api;
