import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore  = defineStore('user', {
  state: () => ({
    user: {
      name: '',
      email: '',
      phone: '',
      bio: '',
      skills: [],
      profilePicture: '',
    },
    isLoading: false, // Loading state indicator
    errorMessage: null, // Error message storage
  }),
  actions: {
    // Fetch user data using JWT
    async fetchUser() {
      this.isLoading = true;
      this.errorMessage = null;

      try {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('token');

        if (!token) {
          throw new Error('Token not found. Please log in again.');
        }

        // Send request to fetch user data
        const response = await axios.get(`http://localhost:5000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update user data
        this.user = response.data;
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Failed to fetch user data.';
        console.error('Error fetching user data:', error);
      } finally {
        this.isLoading = false; // Stop the loading state
      }
    },

    // Update user data on the server
     async updateUser(updatedUser) {
      this.isLoading = true;
      this.errorMessage = null;

      try {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');

        if (!token) {
          throw new Error('Token not found. Please log in again.');
        }

        // Send the updated user data to the server
        const response = await axios.put(`http://localhost:5000/api/users/profile`,   { ...updatedUser, id :id }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update local user data
        this.user = response.data;
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Failed to update user data.';
        console.error('Error updating user data:', error);
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
      this.user = {
        name: '',
        email: '',
        phone: '',
        bio: '',
        skills: [],
        profilePicture: '',
      };
    },
  },
});
