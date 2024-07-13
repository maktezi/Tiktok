import axios from "axios";

export default defineNuxtPlugin((NuxtApp) => {
  axios.defaults.baseURL = "http://localhost:8000";
  axios.defaults.withCredentials = true;
  // axios.defaults.headers["X-XSRF-TOKEN"] = getCookie("XSRF-TOKEN");

  return {
    provide: {
      axios: axios,
    },
  };
});
