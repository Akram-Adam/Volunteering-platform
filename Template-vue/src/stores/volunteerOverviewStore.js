// store/volunteerStore.js
import { defineStore } from 'pinia';

export const useVolunteerStore = defineStore('volunteer', {
  state: () => ({
    recentOpportunities: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    // Access the API
    async fetchOpportunities() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch('/api/recent-opportunities');
        if (!response.ok) throw new Error('Failed to fetch data');
        this.recentOpportunities = await response.json();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isLoading = false;
      }
    },
// Mark the opportunity as completed
    markAsCompleted(id) {
      const opportunity = this.recentOpportunities.find(op => op.id === id);
      if (opportunity && opportunity.status === 'Ongoing') {
        opportunity.status = 'Completed';
      }
    },
  },
  getters: {
    stats() {
      const totalOpportunities = this.recentOpportunities.length;
      const completed = this.recentOpportunities.filter(op => op.status === 'Completed').length;
      const ongoing = this.recentOpportunities.filter(op => op.status === 'Ongoing').length;
      return { totalOpportunities, completed, ongoing };
    },
  },
});
