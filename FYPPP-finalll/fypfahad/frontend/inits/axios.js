import axios from 'axios'

// const HOST = 'http://192.168.2.103:8080'
const BASE_URL = 'http://172.16.187.83:8080/api/v1';
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export default axiosInstance