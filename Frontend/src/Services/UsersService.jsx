import httpService, { setCommonHeader } from "./HttpService";
import jwt_decode from "jwt-decode";
const TOKEN = "token";

export const setToken = () => {
  setCommonHeader("Authorization", getJWT());
};

export const getJWT = () => {
  return localStorage.getItem(TOKEN);
};

export const logOut = () => {
  localStorage.removeItem(TOKEN);
  setToken();
};

export const getUser = () => {
  try {
    const tokenKey = getJWT();
    return jwt_decode(tokenKey);
  } catch {
    return null;
  }
};

export const signUp = (userData) => {
  return httpService.post("/user/signUp", userData);
};

export async function signIn(userData) {
  debugger;
  const { data: token } = await httpService.post("/user/signIn", userData);
  localStorage.setItem(TOKEN, token);
  setToken();
}

const usersService = {
  signUp,
  signIn,
};

export default usersService;
