<template>
    <div class="text-center text-[28px] mb-4 font-bold text-black">Login</div>

    <div class="px-6 pb-1.5 text-[15px] text-black">Email address</div>

    <div class="px-6 pb-2">
        <TextInput
            placeholder="Email address"
            v-model:input="email"
            inputType="email"
            :autofocus="true"
            error=""
        />
    </div>
    <div class="px-6 pb-2">
        <TextInput
            placeholder="Password"
            v-model:input="password"
            inputType="password"
            error=""
        />
    </div>
    <div class="px-6 text-[12px] text-gray-600">Forgot password?</div>

    <div class="px-6 pb-2 mt-6">
        <!--        :disabled="!email || !password"-->
        <!--        :class="!email || !password ? 'bg-gray-200' : 'bg-[#F02C56]'"-->
        <button
            @click="() => login()"
            class="w-full text-[17px] font-semibold bg-[#F02C56] text-white py-3 rounded-sm"
        >
            Log in
        </button>
    </div>
</template>

<script setup lang="ts">
import TextInput from "~/components/TextInput.vue";

const { $axios } = useNuxtApp();
let email = ref("");
let password = ref("");
let errors = ref("");

const login = async () => {
    try {
        await $axios.get("/sanctum/csrf-cookie");
        await $axios.post(
            "/login",
            {
                email: "admin@mail.com",
                password: "admin1234",
                remember: false,
            },
            {
                headers: {
                    accept: "application/json",
                    "X-CSRF-TOKEN": getCookie("XSRF-TOKEN"),
                },
                withCredentials: true,
            },
        );
        let userData = await $axios.get("/api/user");
        console.log(userData);
    } catch (error) {
        console.log(error);
    }
};

function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}
</script>
