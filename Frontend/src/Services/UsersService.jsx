import httpService from "./HttpService";

export const signUp = (userData) => {
  return httpService.post("/user/signUp", userData);
};

export const signIn = (userData) => {
  return httpService.post("/user/signIn", userData);
};

const usersService = {
  signUp,
  signIn,
};

export default usersService;
