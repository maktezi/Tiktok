import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: "",
    name: "",
    bio: "",
    image: "",
  }),
  actions: {
    //
  },
  persist: true,
});
