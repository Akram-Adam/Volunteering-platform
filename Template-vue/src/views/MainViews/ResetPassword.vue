<template>
  <PageHeader />
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Reset Password</h2>
      <form @submit.prevent="handleResetPassword">
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">New Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <!-- Error & Success Messages -->
        <p v-if="authStore.errorMessage" class="text-red-500 text-sm mb-4">
          {{ authStore.errorMessage }}
        </p>
        <p v-if="authStore.successMessage" class="text-green-500 text-sm mb-4">
          {{ authStore.successMessage }}
        </p>

        <!-- Loader -->
        <div v-if="authStore.isLoading" class="flex justify-center items-center mb-4">
          <span class="loader"></span>
        </div>

        <button
          type="submit"
          class="w-full bg-[#3E5879] text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition"
          :disabled="authStore.isLoading"
        >
          Reset Password
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/resetPassword';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'ResetPassword',
  setup() {
    const authStore = useAuthStore();
    const route = useRoute();
    const router = useRouter();
    const token = route.query.token;

    const password = ref('');
    const confirmPassword = ref('');

    const handleResetPassword = async () => {
      if (password.value !== confirmPassword.value) {
        authStore.errorMessage = 'Passwords do not match.';
        return;
      }
      await authStore.resetPassword({ token, password: password.value });

      if (!authStore.errorMessage) {
        setTimeout(() => router.push('/login'), 2000); // Redirect to login after success
      }
    };

    return {
      authStore,
      password,
      confirmPassword,
      handleResetPassword,
    };
  },
};
</script>

<style scoped>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
