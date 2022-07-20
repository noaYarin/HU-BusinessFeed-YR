import httpService from "./HttpService";

export const signUp = (userData) => {
  return httpService.post("/signUp", userData);
};

export const signIn = (userData) => {
  return httpService.post("/signIn", userData);
};

const usersService = {
  signUp,
  signIn,
};

export default usersService;
