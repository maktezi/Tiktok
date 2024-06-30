import { defineStore } from "pinia";
import axios from "~/plugins/axios";
import getCookie from "~/composables/useAuth";

const $axios = axios().provide.axios;

export const useUserStore = defineStore("user", {
  state: () => ({
    id: "",
    name: "",
    email: "",
    bio: "",
    image: "",
  }),
  actions: {
    async getToken() {
      await $axios.get("/sanctum/csrf-cookie");
    },
    async login(email: string, password: string) {
      const sanctumCookie = getCookie("XSRF-TOKEN");
      await $axios.post(
        "/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            accept: "application/json",
            "X-XSRF-TOKEN": sanctumCookie,
          },
        },
      );
    },
    async register(
      name: string,
      email: string,
      password: string,
      confirmPassword: string,
    ) {
      await $axios.post("/register", {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
    },
    async getUser() {
      let response = await $axios.get("/api/logged-in-user");

      this.$state.id = response.data[0].id;
      this.$state.name = response.data[0].name;
      this.$state.bio = response.data[0].bio;
      this.$state.image = response.data[0].image;
    },
    async logout() {
      await $axios.post("/logout");
      await this.resetUser();
    },
    async resetUser() {
      this.$state.id = "";
      this.$state.name = "";
      this.$state.email = "";
      this.$state.bio = "";
      this.$state.image = "";
    },
  },
  persist: true,
});
