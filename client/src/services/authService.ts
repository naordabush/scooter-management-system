import api from "./api";

interface LoginPayload {
  username: string;
  password: string;
}

export const login = (payload: LoginPayload) => {
  return api.post("/users/login", payload);
};
