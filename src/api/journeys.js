import api from "./api";

export const all = () => api.get("/journeys");
export const one = (id) => api.get(`/journeys/${id}`);
