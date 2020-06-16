import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/richardburton/api/v1",
    responseType: "json"
});

export const setAuthenticationToken = token => {
    if (token !== undefined)
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete api.defaults.headers.common["Authorization"];
};

export default api;
