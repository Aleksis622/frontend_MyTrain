import api from "./api";

export const all = () => api.get("/trips");

export const one = (id) => api.get(`/trips/${id}`);

export const search = (filters) =>
  api.get("/trips/search", { params: filters });

export const mapTrains = () => api.get("/map/trains");

export const mapRoute = (tripId) =>
  api.get(`/map/train-route/${tripId}`);
