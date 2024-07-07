import { defineStore } from "pinia";
import { useUserStore } from "~/stores/user";
import axios from "../plugins/axios";
import type { AxiosError, AxiosResponse } from "axios";

const $axios = axios().provide.axios;

export const useGeneralStore = defineStore("general", {
  state: () => ({
    isLoginOpen: false,
    isEditProfileOpen: false,
    selectedPost: null,
    ids: null,
    isBackUrl: "/",
    posts: null,
    suggested: null,
    following: null,
  }),
  actions: {
    bodySwitch(val: boolean) {
      if (val) {
        document.body.style.overflow = "hidden";
        return;
      }
      document.body.style.overflow = "visible";
    },
    allLowerCaseNoCaps(str: string) {
      return str.split(" ").join("").toLowerCase();
    },
    setBackUrl(url: string) {
      this.isBackUrl = url;
    },
    async hasSessionExpired() {
      await $axios.interceptors.response.use(
        (response: AxiosResponse) => {
          return response;
        },
        (error: AxiosError) => {
          switch (error.response?.status) {
            case 401: // Not logged in
            case 419: // Session Expired
            case 503: // Down for maintenance
              useUserStore().resetUser();
              window.location.href = "/";
              break;
            case 500:
              alert("Something went wrong! Please try again.");
              break;
            default:
              return Promise.reject(error);
          }
        },
      );
    },
  },
  persist: true,
});
