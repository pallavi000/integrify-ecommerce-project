import axios from "axios";

export const baseURL = "https://api.escuelajs.co/api/v1";

const axiosInstance = axios.create({
  baseURL: baseURL,
});
export default axiosInstance;
