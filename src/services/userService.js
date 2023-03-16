import httpServices, { setCommonHeader } from "./httpServices";
import jwtDecode from "jwt-decode";

const TOKEN_KET = "token";
setTokenHeader();

export function getJWT() {
  return localStorage.getItem(TOKEN_KET);
}

export function setTokenHeader() {
  setCommonHeader("x-auth-token", getJWT());
}

export function createUser(user) {
  return httpServices.post("/users", user);
}

export async function conectUser(credentials) {
  const { data } = await httpServices.post("/auth", credentials);
  localStorage.setItem(TOKEN_KET, data.token);
  setTokenHeader();
}

export function recoverPassword(email) {
  return httpServices.post("users/recovery-password", email);
}

export function logOutUser() {
  localStorage.removeItem(TOKEN_KET);
  setTokenHeader();
}

export function getUserDetails() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

const userService = {
  createUser,
  conectUser,
  logOutUser,
  getUserDetails,
  recoverPassword,
};

export default userService;
