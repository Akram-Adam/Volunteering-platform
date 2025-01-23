import { defineStore } from 'pinia';
import axios from 'axios';

export const useVolunteerStore = defineStore('volunteer', {
  state: () => ({
    recentOpportunities: [], // List of volunteer opportunities
    isLoading: false, // Loading state indicator
    error: null, // Error message storage
  }),
  actions: {
    // Fetch volunteer opportunities from the API
    async fetchOpportunities() {
      this.isLoading = true;
      this.error = null;

      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('Token not found. Please log in again.');
        }

        // Send a GET request to fetch opportunities
        const response = await axios.get('http://localhost:5000/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.recentOpportunities = response.data;
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch opportunities.';
        console.error('Error fetching opportunities:', err);
      } finally {
        this.isLoading = false;
      }
    },

    // Mark an opportunity as completed
    async markAsCompleted(id) {
      const opportunity = this.recentOpportunities.find(op => op.id === id);
      if (opportunity && opportunity.status === 'Ongoing') {
        opportunity.status = 'Completed';

        // Optionally update the API to reflect the change
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('Token not found. Please log in again.');

          await axios.put(`http://localhost:5000/api/posts/${id}`, { status: 'Completed' }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (err) {
          console.error('Error updating opportunity status:', err);
        }
      }
    },

    // Update an opportunity on the server
    async updateOpportunity(id, updatedData) {
      this.isLoading = true;
      this.error = null;

      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('Token not found. Please log in again.');
        }

        // Send a PUT request to update the opportunity
        const response = await axios.put(`http://localhost:5000/api/posts/${id}`, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update the local state with the updated opportunity
        const index = this.recentOpportunities.findIndex(op => op.id === id);
        if (index !== -1) {
          this.recentOpportunities[index] = response.data;
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to update the opportunity.';
        console.error('Error updating opportunity:', err);
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {
    // Calculate stats for the opportunities
    stats() {
      const totalOpportunities = this.recentOpportunities.length;
      const completed = this.recentOpportunities.filter(op => op.status === 'Completed').length;
      const ongoing = this.recentOpportunities.filter(op => op.status === 'Ongoing').length;
      return { totalOpportunities, completed, ongoing };
    },
  },
});
