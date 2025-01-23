<template>
  <PageHeader />
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
      <form @submit.prevent="handleSignUp">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="name"
            type="text"
            id="name"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
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
          <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            v-model="phone"
            type="tel"
            id="phone"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
          <select
            v-model="gender"
            id="gender"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
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
        <button
          type="submit"
          class="w-full bg-[#3E5879] text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>
      </form>
      <p class="mt-6 text-center text-sm text-gray-600">
        Already have an account?
        <RouterLink to="/login" class="text-indigo-500 hover:underline">
          Log In
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/GeneralComponents/PageHeader.vue';
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from '@/stores/authStore';// Import the store

export default {
  name: "SignUp",
  components: {
    PageHeader,
  },
  setup() {
    const authStore = useAuthStore(); // Use the store
    const router = useRouter();
    const name = ref("");
    const email = ref("");
    const phone = ref("");
    const gender = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const handleSignUp = () => {
      const userData = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        gender: gender.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      };

// Call action to register the user
      authStore.signUp(userData , router)
    };
    return { name, email, phone, gender, password, confirmPassword, handleSignUp };
  },
};
</script>

<style scoped>

</style>
