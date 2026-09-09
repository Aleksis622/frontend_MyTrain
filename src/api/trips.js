import axios from "./api";

export const all = () => {
  return axios.get("/trips");
};
