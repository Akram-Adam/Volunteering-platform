import axios from 'axios';

export const UserService = {
  async signUp(user) {
    const response = await axios.post('/api/signup', user);
    return response.data;
  },
};
