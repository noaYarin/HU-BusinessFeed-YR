import axios from "axios";

axios.defaults.baseURL = process.env.API_URL;

const httpService = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
