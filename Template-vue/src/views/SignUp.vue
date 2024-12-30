<template>
  <div class="signup-page max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>

    <!-- Sign-up Form -->
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="name" class="block font-semibold mb-2">Full Name</label>
        <input
          v-model="user.name"
          id="name"
          type="text"
          class="w-full p-2 border rounded"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div class="mb-4">
        <label for="email" class="block font-semibold mb-2">Email</label>
        <input
          v-model="user.email"
          id="email"
          type="email"
          class="w-full p-2 border rounded"
          placeholder="Enter your email"
          required
        />
      </div>

      <div class="mb-4">
        <label for="password" class="block font-semibold mb-2">Password</label>
        <input
          v-model="user.password"
          id="password"
          type="password"
          class="w-full p-2 border rounded"
          placeholder="Enter your password"
          required
        />
      </div>

      <div class="mb-4">
        <label for="userType" class="block font-semibold mb-2">User Type</label>
        <select
          v-model="user.userType"
          id="userType"
          class="w-full p-2 border rounded"
          required
        >
          <option value="volunteer">Volunteer</option>
          <option value="requester">Requester</option>
        </select>
      </div>

      <button
        type="submit"
        class="w-full bg-[#3E5879] text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Sign Up
      </button>

      <p class="mt-4 text-center">
        Already have an account? <router-link to="/login" class="text-blue-500">Login here</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserService } from '@/services/UserService'; // Assuming you have a service for API calls

export default {
  name: 'SignUp',
  setup() {
    const user = ref({
      name: '',
      email: '',
      password: '',
      userType: 'volunteer', // Default to volunteer
    });

    const router = useRouter();

    const handleSubmit = async () => {
      try {
        // Call to the UserService to register the user
        await UserService.signUp(user.value);
        // Redirect to login page after successful sign-up
        router.push('/login');
      } catch (error) {
        alert('Failed to sign up. Please try again.');
      }
    };

    return { user, handleSubmit };
  },
};
</script>

<style scoped>
.signup-page {
  font-family: Arial, sans-serif;
  max-width: 500px;
}
</style>
