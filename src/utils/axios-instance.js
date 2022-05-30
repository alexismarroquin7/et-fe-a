import axios from "axios";

export const axiosInstance = () => axios.create({
  baseURL: process.env.NODE_ENV === 'development'
  ? `http://localhost:4000/api`
  : `https://<production_link>/api`
})

export const axiosWithAuth = () => axios.create({
  baseURL: process.env.NODE_ENV === 'development'
  ? `http://localhost:4000/api`
  : `https://<production_link>/api`,
  headers: {
    Authorization: localStorage.getItem('et-fe-a-token')
  }
})