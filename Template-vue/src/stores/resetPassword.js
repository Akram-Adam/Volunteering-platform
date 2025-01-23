import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const isLoading = ref(false);
  const errorMessage = ref('');
  const successMessage = ref('');
  const token = localStorage.getItem('token') || ''; // تخزين الـ token من localStorage

  // Function to send password reset link
  const sendResetLink = async (email) => {
    isLoading.value = true;
    errorMessage.value = ''; // Reset the error message
    successMessage.value = ''; // Reset success message
    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`, // إضافة الـ token في الـ header
          },
        }
      );
      successMessage.value = response.data.message; // Success message that comes from the server
    } catch (error) {
      errorMessage.value = error.response?.data?.message || 'There is a network error.';
    } finally {
      isLoading.value = false;
    }
  };

  // Password reset function
  const resetPassword = async ({ token, password }) => {
    isLoading.value = true;
    errorMessage.value = '';
    successMessage.value = '';

    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        { token, password },
        {
          headers: {
            Authorization: `Bearer ${token}`, // إضافة الـ token في الـ header
          },
        }
      );
      successMessage.value = response.data.message;
    } catch (error) {
      errorMessage.value = error.response?.data?.message || 'There is a network error.';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    errorMessage,
    successMessage,
    sendResetLink,
    resetPassword,
  };
});
