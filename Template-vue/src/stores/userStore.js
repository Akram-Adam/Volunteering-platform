import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore({
  id: 'user', // Define store ID
  state: () => ({
    user: {
      id: null,
      name: '',
      photo: '',
    },
    isLoading: false, // Loading state indicator
    errorMessage: null, // Error message storage
  }),
  actions: {
    async fetchUserData() {
      this.isLoading = true;
      this.errorMessage = null;

      try {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        if (!token) {
          throw new Error('Token not found. Please log in again.');
        }

        // Send request to the API with token in the Authorization header
        const response = await axios.get(`http://localhost:5000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set user data from the API response
        this.user = response.data;
      } catch (error) {
        // Log the error message
        this.errorMessage = error.response?.data?.message || 'Failed to fetch user data.';
        console.error('Error fetching user data:', error);

        // Reset user data in case of an error
        this.user = { id: null, name: '', photo: '' };
      } finally {
        this.isLoading = false; // Stop the loading state
      }
    },

    // Fetch user data by ID
    async fetchUserById(userId) {
      this.isLoading = true;
      this.errorMessage = null;

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found. Please log in again.');
        }

        // Send request to the API with the userId
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set user data from the API response
        this.user = response.data;
      } catch (error) {
        // Log the error message
        this.errorMessage = error.response?.data?.message || 'Failed to fetch user data by ID.';
        console.error('Error fetching user data by ID:', error);
      } finally {
        this.isLoading = false; // Stop the loading state
      }
    },

    // Log out the user
    logout() {
      // Remove the token from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('id');

      // Reset user data
      this.user = { id: null, name: '', photo: '' };
    },
  },
});
