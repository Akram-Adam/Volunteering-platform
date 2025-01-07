// store for authentication
import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // user data
    token: null, // token
    isLoading: false, // Loading status
    errorMessage: null, // error messages
  }),
  actions: {
    // Sign up
    async signUp(userData) {
// Check that the password matches
      if (userData.password !== userData.confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Passwords Don't Match!",
          text: "Please ensure both passwords are identical.",
        });
        return;
      }

      try {
// Send registration data to the backend via POST
        const response = await axios.post('localhost:<port>/api/signup', {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          gender: userData.gender,
          password: userData.password,
        });

// If the response was successful
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Sign-up Successful!",
            text: "You can now log in with your account.",
            confirmButtonColor: "#3E5879",
          });

// User data can be stored in store or session state
this.user = response.data.user; // Save user data if the response contains it
        }
      } catch (error) {
// If an error occurs in the request
        Swal.fire({
          icon: "error",
          title: "Sign-up Failed",
          text: error.response ? error.response.data.message : 'An error occurred. Please try again.',
        });
      }
    },
    //Log in
    async login(credentials) {
      this.isLoading = true;
      this.errorMessage = null;
      try {
        const response = await axios.post('localhost:<port>/api/login', credentials);
        const { user, token } = response.data;

        if (user && user.id) {
          this.user = user;
          this.token = token;

          // Save the token to localStorage
          localStorage.setItem('token', token);
          // Setting the token in the request headers
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          throw new Error('Invalid user data.');
        }
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },

    // logout
    logout() {
      this.user = null;
      this.token = null;
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    },
  },
});
