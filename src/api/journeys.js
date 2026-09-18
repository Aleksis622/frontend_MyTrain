import api from "./api";

// Get all journeys (paginated)
export const all = () => {
  return api.get("/journeys");
};

// Get one journey by ID
export const one = (id) => {
  return api.get(`/journeys/${id}`);
};

// Search journeys (filters: from, to, date)
export const search = (filters) => {
  return api.get("/journeys/search", { params: filters });
};

// Create a new journey
export const create = (data) => {
  return api.post("/journeys", data);
};

// Update an existing journey
export const update = (id, data) => {
  return api.put(`/journeys/${id}`, data);
};

// Delete a journey
export const remove = (id) => {
  return api.delete(`/journeys/${id}`);
};

