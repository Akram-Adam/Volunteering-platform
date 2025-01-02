<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <form @submit.prevent="handleLogin">
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
        <div class="mb-6">
          <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
          <select
            v-model="role"
            id="role"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="" disabled>Select your role</option>
            <option value="volunteer">Volunteer</option>
            <option value="requester">Requester</option>
          </select>
        </div>
        <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>
        <button
          type="submit"
          class="w-full bg-[#3E5879] text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>

      <!-- Forgot Password and Sign Up -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-500">
          <router-link to="/forgot-password" class="text-indigo-600 hover:underline">Forgot Password?</router-link>
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
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LogIn",
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const role = ref("");
    const errorMessage = ref("");

    const handleLogin = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        errorMessage.value = "User not found. Please sign up.";
        return;
      }

      if (user.email !== email.value) {
        errorMessage.value = "Incorrect email.";
        return;
      }

      if (user.password !== password.value) {
        errorMessage.value = "Incorrect password.";
        return;
      }

      if (role.value === "volunteer") {
        router.push("/volunteer-dashboard");
      } else if (role.value === "requester") {
        router.push("/requester-dashboard");
      }
    };

    return { email, password, role, errorMessage, handleLogin };
  },
};
</script>

<style scoped>
.material-icons {
  font-size: 20px;
}
</style>
