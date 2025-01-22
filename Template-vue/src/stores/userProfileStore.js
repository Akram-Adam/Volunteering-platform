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
        const response = await axios.get('http://localhost:5000/api/user');
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async updateUser(updatedUser) {
      try {
        const response = await axios.put('http://localhost:5000/api/user', updatedUser);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
  },
});
