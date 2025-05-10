import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://nesthunt-server.vercel.app/api/v1",
});

export default apiClient;
