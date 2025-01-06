<template>
    <PageHeader />
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
        <form @submit.prevent="handleResetPassword">
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
  
          <!-- Error Message -->
          <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>
  
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-[#3E5879] text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            Reset Password
          </button>
        </form>
  
        <!-- Login Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-500">
            Remembered your password?
            <router-link to="/login" class="text-indigo-600 hover:underline">Login</router-link>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import PageHeader from '@/components/GeneralComponents/PageHeader.vue'; // Import the landing page header
  import Swal from 'sweetalert2'; // Import SweetAlert2
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  export default {
    name: "ForgotPassword",
    components: {
      PageHeader, // Register the PageHeader component
    },
    setup() {
      const router = useRouter();
      const email = ref("");
      const errorMessage = ref("");
  
      const handleResetPassword = () => {
        // Check if the email exists in the localStorage or user data
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          errorMessage.value = "No user found. Please sign up.";
          return;
        }
  
        // Validate email
        if (user.email !== email.value) {
          errorMessage.value = "Email not found.";
          return;
        }
  
        // Show success animation
        Swal.fire({
          icon: 'success',
          title: 'Reset Link Sent!',
          text: 'A password reset link has been sent to your email.',
          timer: 2000, // This will automatically close the popup after 2 seconds
          showConfirmButton: false, // No need for confirm button
        });
  
        // Redirect to login page after the success animation
        setTimeout(() => {
          router.push("/login");
        }, 2000); // Delay the redirect until the SweetAlert closes
      };
  
      return { email, errorMessage, handleResetPassword };
    },
  };
  </script>
  
  <style scoped>
  .material-icons {
    font-size: 20px;
  }
  </style>
  