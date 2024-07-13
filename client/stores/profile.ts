import { defineStore } from "pinia";
import axios from "~/plugins/axios";

const $axios = axios().provide.axios;

export const useProfileStore = defineStore("profile", {
  state: () => ({
    id: "",
    name: "",
    bio: "",
    image: "",
    post: "",
    posts: [],
    allLikes: 0,
  }),
  actions: {
    async getProfile(id: any) {
      this.resetUser();
      try {
        const res = await $axios.get(`/api/profiles/${id}`);
        const userData = res.data.user[0];
        const postData = res.data.post;
        this.$state.id = userData.id;
        this.$state.name = userData.name;
        this.$state.bio = userData.bio || "";
        this.$state.image = userData.image;
        this.$state.posts = postData || [];
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    },
    resetUser() {
      this.$state.id = "";
      this.$state.name = "";
      this.$state.bio = "";
      this.$state.image = "";
      this.$state.posts = [];
    },
  },
  persist: true,
});
