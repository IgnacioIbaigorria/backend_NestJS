import axios from 'axios'

const api = axios.create({
  baseURL: 'http://34.227.197.241:3000',
  headers: { 'Content-Type': 'application/json' }
})

export default api
