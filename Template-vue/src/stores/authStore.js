// store for authentication
import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // User data
    token: localStorage.getItem('token') || null, // Token stored in localStorage
    isLoading: false, // Loading status
    errorMessage: null, // Error messages
  }),
  actions: {
    // Sign up
    async signUp(userData, router) {
      // Check that the passwords match
      if (userData.password !== userData.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: "Passwords Don't Match!",
          text: 'Please ensure both passwords are identical.',
        })
        return
      }

      try {
        // Send registration data to the backend via POST
        const response = await axios.post('http://localhost:5000/api/signup', {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          gender: userData.gender,
          password: userData.password,
        })

        // If the response was successful
        if (response.status === 200  || 201 || 204) {
          Swal.fire({
            icon: 'success',
            title: 'Sign-up Successful!',
            text: 'You can now log in with your account.',
            confirmButtonColor: '#3E5879',
          })

          // Redirect to the login page
          if (router) {
            router.push('/login')
          } else {
            console.error('Router is not defined!')
          }
        }

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Sign-up Failed',
          text: error.response?.data?.message || 'An error occurred. Please try again.',
        })
        console.log(error)
      }
    },

    // Log in
    async login(credentials, router) {
      this.isLoading = true
      this.errorMessage = null
      try {
        const response = await axios.post('http://localhost:5000/api/login', credentials)
        const { user, token } = response.data

        if (user && token && user.id) {
          this.user = user
          this.token = token
          this.user.id = user.id

          // Save the token to localStorage
          localStorage.setItem('token', token)
          localStorage.setItem('id', user.id)

          // Set the token in the headers for future requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

          // Redirect to the home page or dashboard
          if (router) {
            router.push('/main-page')
          } else {
            console.error('Router is not defined!')
          }
        } else {
          throw new Error('Invalid login response.')
        }
      } catch (error) {
        this.errorMessage = error.response?.data?.message
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: this.errorMessage,
        })
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },


    // Log out
    logout(router) {
      this.user = null
      this.token = null

      // Remove token from localStorage and Axios headers
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']

      // Redirect to the login page
      router.push('/login')
    },

    // Check authentication status
    async checkAuth() {
      if (!this.token) {
        this.logout()
        return false
      }

      try {
        // Validate token with the server
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        const response = await axios.get('http://localhost:5000/api/auth/validate')

        if (response.status === 200) {
          this.user = response.data.user
          return true
        }
      } catch (error) {
        console.error('Authentication validation failed:', error)
        this.logout()
        return false
      }
    },
  },
})
