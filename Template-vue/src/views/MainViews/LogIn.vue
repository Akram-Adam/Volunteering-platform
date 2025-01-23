<template>
  <PageHeader />
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <form @submit.prevent="handleLogin">
        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <!-- Error Message -->
        <p v-if="authStore.errorMessage" class="text-red-500 text-sm mb-4">
          {{ authStore.errorMessage }}
        </p>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="authStore.isLoading"
          class="w-full bg-[#3E5879] text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          <span v-if="authStore.isLoading">Loading...</span>
          <span v-else>Login</span>
        </button>
      </form>

      <!-- Forgot Password and Sign Up Links -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-500">
          <router-link to="/login/forgot-password" class="text-indigo-600 hover:underline">Forgot Password?</router-link>
        </p>
        <p class="text-sm text-gray-500 mt-2">
          Don't have an account?
          <router-link to="/signup" class="text-indigo-600 hover:underline">Sign Up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/GeneralComponents/PageHeader.vue";
import Swal from "sweetalert2";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

export default {
  name: "LogIn",
  components: { PageHeader },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const email = ref("");
    const password = ref("");

    const handleLogin = async () => {
      await authStore.login({ email: email.value, password: password.value }, router);

      if (!authStore.errorMessage) {
// After successful login, fetch the user data using the ID
         const user = authStore.user;

        // Redirect to the main page
      }
    };

    return { email, password, handleLogin, authStore };
  },
};
</script>
<style scoped>
</style>
