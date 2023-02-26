import axios from "axios";
import config from "../config.json";

axios.defaults.baseURL = config.apiUrl;

export const setCommonHeader = (headerName, value) => {
  axios.defaults.headers.common[headerName] = value;
};

const httpServices = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default httpServices;
