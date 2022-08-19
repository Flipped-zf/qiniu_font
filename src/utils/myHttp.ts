import Cookies from "js-cookie";
import axios from "axios";

const http = axios.create({
  baseURL: '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  headers: {'x-csrf-token': Cookies.get('csrfToken')},
  timeout: 10000, // request timeout
  withCredentials: true
})

export default http
