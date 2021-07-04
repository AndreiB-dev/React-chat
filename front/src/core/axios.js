import axios from "axios";

axios.defaults.headers.common["token"] = window.localStorage.token;
axios.defaults.baseURL = window.location.origin;

window.axios = axios;

export default axios;
