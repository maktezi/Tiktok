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
    posts: "",
    allLikes: 0,
  }),
  actions: {
    async getProfile(id: any) {
      this.resetUser();
      let res = await $axios.get(`/api/profiles/${id}`);
      this.$state.id = res.data.user[0].id;
      this.$state.name = res.data.user[0].name;
      this.$state.bio = res.data.user[0].bio;
      this.$state.image = res.data.user[0].image;
      this.$state.posts = res.data.posts;
    },
    resetUser() {
      this.$state.id = "";
      this.$state.name = "";
      this.$state.bio = "";
      this.$state.image = "";
      this.$state.posts = "";
    },
  },
  persist: true,
});
