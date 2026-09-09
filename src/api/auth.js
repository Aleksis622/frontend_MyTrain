import api from "./api";

export const login = (email, pass) =>
  api.post("/login", { email, password: pass });

export const logout = () => api.post("/logout");

export const me = () => api.get("/user");
