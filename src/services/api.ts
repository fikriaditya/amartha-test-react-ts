import axios from 'axios';

// Instance for Basic Info (Step 1)
export const apiStep1 = axios.create({
  baseURL: 'http://localhost:4001',
  headers: { 'Content-Type': 'application/json' }
});

// Instance for Details (Step 2)
export const apiStep2 = axios.create({
  baseURL: 'http://localhost:4002',
  headers: { 'Content-Type': 'application/json' }
});