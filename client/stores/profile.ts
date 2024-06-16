import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
    state: () => ({
        id: '',
        name: '',
        bio: '',
        image: '',
        post: '',
        posts: '',
        allLikes: 0
    }),
    actions: {
        //
    },
})