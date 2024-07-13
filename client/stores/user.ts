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
      await $axios.post(
        "/login",
        {
          email: email,
          password: password,
        },
        {
          headers: { "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") },
        },
      );
    },
    async register(
      name: string,
      email: string,
      password: string,
      confirmPassword: string,
    ) {
      await $axios.post(
        "/register",
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        },
        {
          headers: { "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") },
        },
      );
    },
    async getUser() {
      let response = await $axios.get("/api/logged-in-user", {
        headers: { "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") },
      });
      this.$state.id = response.data[0].id;
      this.$state.name = response.data[0].name;
      this.$state.bio = response.data[0].bio;
      this.$state.image = response.data[0].image;
    },
    async updateUserImage(data: FormData) {
      try {
        const response = await $axios.post("/api/update-user-image", data, {
          headers: { "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") },
        });

        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(response.data.error || "Failed to update user image");
        }
      } catch (error) {
        console.error("Error updating user image:", error);
        throw error;
      }
    },
    async createPost(data: object) {
      return await $axios.post("/api/posts", data, {
        headers: { "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") },
      });
    },
    async logout() {
      try {
        await $axios.post("/logout", null, {
          headers: { "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") },
        });
        this.resetUser();
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
    resetUser() {
      this.$state.id = "";
      this.$state.name = "";
      this.$state.email = "";
      this.$state.bio = "";
      this.$state.image = "";
    },
  },
  persist: true,
});
