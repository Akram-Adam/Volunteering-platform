import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {
      id: null,
      name: '',
      photo: ''
    },
    isLoading: false,
    errorMessage: null,
  }),
  actions: {
    async fetchUserData() {
      this.isLoading = true;
      this.errorMessage = null;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.user = response.data; // Assuming the API returns the user object with id, name, photo, etc.
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Failed to fetch user data.';
      } finally {
        this.isLoading = false;
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.user = { id: null, name: '', photo: '' };
    },
  },
});
