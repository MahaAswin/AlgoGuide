import axios from "axios";

// Simple client for the external code executor service
const ExecutorAPI = axios.create({
  baseURL: "http://localhost:3001",
});

export default ExecutorAPI;

