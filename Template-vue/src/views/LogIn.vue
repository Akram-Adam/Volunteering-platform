<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold text-center text-blue-800 mb-6">Login</h2>

      <!-- Error Message Placeholder -->
      <div v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</div>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-semibold text-gray-600 mb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-semibold text-gray-600 mb-2">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            required
          />
        </div>

        <div class="mb-4 flex items-center justify-between">
          <label class="flex items-center text-sm text-gray-600">
            <input type="checkbox" class="mr-2" /> Remember Me
          </label>
          <a href="#" class="text-sm text-blue-600 hover:underline">Forgot Password?</a>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Login
        </button>
      </form>

      <p class="mt-4 text-sm text-center text-gray-600">
        Don’t have an account? <router-link to="/signup" class="text-blue-600 hover:underline">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    handleLogin() {
      if (!this.email || !this.password) {
        this.errorMessage = "Please fill in all fields.";
        return;
      }

      // Mock login logic
      alert(`Logged in with email: ${this.email}`);
      this.errorMessage = ""; // Clear error message on success
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}
</style>
