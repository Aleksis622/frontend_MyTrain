import api from "./api";

export const login = (email, password) => {
  return api.post("/login", { email, password });
};

export const logout = () => {
  return api.post("/logout");
};

export const me = () => {
  return api.get("/user");
};
