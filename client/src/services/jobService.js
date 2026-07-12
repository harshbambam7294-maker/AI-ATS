import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// -----------------------------
// JOB APIs
// -----------------------------

export const getJobs = async () => {
    const { data } = await API.get("/job");
    return data;
};

export const getJobById = async (id) => {
    const { data } = await API.get(`/job/${id}`);
    return data;
};

export const createJob = async (payload) => {
    const { data } = await API.post("/job", payload);
    return data;
};

export const updateJob = async (id, payload) => {
    const { data } = await API.put(`/job/${id}`, payload);
    return data;
};

export const deleteJob = async (id) => {
    const { data } = await API.delete(`/job/${id}`);
    return data;
};

// -----------------------------
// COMPANY APIs
// -----------------------------

export const getCompanies = async () => {
    const { data } = await API.get("/company");
    return data;
};

export default API;