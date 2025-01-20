// stores/opportunityStore.js
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
        const response = await axios.get('/api/opportunities');  // API endpoint
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
        await axios.post('/api/submit-request', requestData);  // Send the request data to the API
        alert(`Your request for "${requestData.title}" has been submitted!`);
      } catch (error) {
        console.error('Failed to submit request:', error);
      }
    },
  },
});
