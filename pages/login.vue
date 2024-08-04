<script setup lang="ts">
useHead({
    title: 'Login | CRM System',
})

const emailRef = ref('')
const passwordRef = ref('')
const nameRef = ref('')
</script>

<template>
    <div class="flex items-center justify-center min-h-screen w-full">
        <div class="rounded bg-sidebar w-1/4 p-5">
            <h1 class="text-2xl font-bold text-center mb-5">Login</h1>

            <form>
                <UiInput
                    placeholder="Email"
                    type="email"
                    class="mb-3"
                    v-model="emailRef"
                />
                <UiInput
                    placeholder="Password"
                    type="password"
                    class="mb-3"
                    v-model="passwordRef"
                />
                <UiInput
                    placeholder="Name"
                    type="name"
                    class="mb-3"
                    v-model="nameRef"
                />
                <div class="flex items-center justify-center gap-5">
                    <UiButton type="button">Login</UiButton>
                    <UiButton type="button">Registration</UiButton>
                </div>
            </form>
        </div>
    </div>
</template>
