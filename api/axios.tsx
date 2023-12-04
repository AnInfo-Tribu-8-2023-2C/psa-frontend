import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
});