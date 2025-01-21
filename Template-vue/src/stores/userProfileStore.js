import { defineStore } from 'pinia';
import axios from 'axios';
export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      name: '',
      email: '',
      phone: '',
      bio: '',
      skills: [],
      profilePicture: '',
    },
  }),
  actions: {
    async fetchUser() {
      try {
        const response = await axios.get('/api/user');
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async updateUser(updatedUser) {
      try {
        const response = await axios.put('/api/user', updatedUser);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
  },
});
