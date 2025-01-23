import { defineStore } from 'pinia';
import axios from 'axios';

export const useOpportunityStore = defineStore('opportunity', {
  state: () => ({
    opportunities: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchOpportunities() {
      this.loading = true;
      this.error = null;
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found. Please log in again.');
        }

        // Send request to fetch opportunities with token in the Authorization header
        const response = await axios.get('http://localhost:5000/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.opportunities = response.data;  // Assuming the API returns an array of opportunities
      } catch (error) {
        this.error = 'Failed to load opportunities';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async submitRequest(requestData) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found. Please log in again.');
        }

        // Send the request data to the API with token in the Authorization header
        await axios.post('http://localhost:5000/api/posts', requestData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert(`Your request for "${requestData.title}" has been submitted!`);
      } catch (error) {
        console.error('Failed to submit request:', error);
      }
    },
  },
});
