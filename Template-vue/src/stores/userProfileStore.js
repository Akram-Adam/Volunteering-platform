import { defineStore } from 'pinia';

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
        const response = await axios.get('/api/user'); // استبدل بـ API المناسب
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async updateUser(updatedUser) {
      try {
        const response = await axios.put('/api/user', updatedUser); // استبدل بـ API المناسب
        this.user = response.data;
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
  },
});
