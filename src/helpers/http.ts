import axios, { type AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? "https://api.collegefootballdata.com" : import.meta.env.VITE_API_URL,
  timeout: 60 * 1000,
});

export default axiosInstance;
