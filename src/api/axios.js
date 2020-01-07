import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/richardburton/api",
    responseType: "json"
});

export const setAuthenticationToken = token => {
    api.defaults.auth = `Bearer ${token}`;
};

export default api;
