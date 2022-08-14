import axios from "axios";
import config from "../Config/config.json";

axios.defaults.baseURL = config.apiUrl;

export const setCommonHeader = (header, value) => {
  axios.defaults.headers.common[header] = value;
};

const httpService = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
