import { defineStore } from "pinia";
import axios from "~/plugins/axios";
import getCookie from "~/composables/useAuth";
import { useGeneralStore } from "~/stores/general";

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
      this.resetUser();
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
      this.resetUser();
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
    async updateUser(name: string, bio: string) {
      return await $axios.patch(
        `/api/update-user`,
        {
          name: name,
          bio: bio,
        },
        { headers: { "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") } },
      );
    },
    async updateUserImage(data: FormData) {
      try {
        return await $axios.post("/api/update-user-image", data, {
          headers: { "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") },
        });
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
    async likePost(post: any, isPostPage: any) {
      let res = await $axios.post(
        "/api/likes",
        { post_id: post.id },
        { headers: { "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") } },
      );
      let singlePost = null;
      if (isPostPage) {
        singlePost = post;
      } else {
        singlePost = useGeneralStore().posts.find((p: any) => p.id === post.id);
      }
      singlePost.likes.push(res.data.like);
    },
    async unlikePost(post: any, isPostPage: any) {
      let deleteLike: any = null;
      let singlePost: any = null;
      if (isPostPage) {
        singlePost = post;
      } else {
        singlePost = useGeneralStore().posts.find((p: any) => p.id === post.id);
      }
      singlePost.likes.forEach((like: any) => {
        if (like.user_id === this.id) {
          deleteLike = like;
        }
      });
      let res = await $axios.delete("/api/likes/" + deleteLike.id, {
        headers: { "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") },
      });
      for (let i = 0; i < singlePost.likes.length; i++) {
        const like = singlePost.likes[i];
        if (like.id === res.data.like.id) {
          singlePost.likes.splice(i, 1);
        }
      }
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
