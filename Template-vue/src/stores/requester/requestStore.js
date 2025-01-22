import { defineStore } from 'pinia';
import axios from 'axios';

export const useRequestStore = defineStore('requestStore', {
  state: () => ({
    requests: [], // List of requests
    loading: false, // Loading status
    error: null, // errors
  }),
  getters: {
    allRequests: (state) => state.requests,
    filteredRequests: (state) => (filter, startDate, endDate) => {
      let filtered = state.requests;
// Filter by status
if (filter && filter !== 'all') {
  filtered = filtered.filter((req) => req.status === filter);
}

// Filter by date
if (startDate || endDate) {
  filtered = filtered.filter((req) => {
    const requestDate = new Date(req.date);
    if (startDate && requestDate < new Date(startDate)) return false;
    if (endDate && requestDate > new Date(endDate)) return false;
    return true;
  });
}

      return filtered;
    },
    stats: (state) => {
      return {
        total: state.requests.length,
        completed: state.requests.filter((req) => req.status === 'Completed').length,
        pending: state.requests.filter((req) => req.status === 'Pending').length,
        canceled: state.requests.filter((req) => req.status === 'Canceled').length,
      };
    },
  },
  actions: {
    async fetchRequests() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        this.requests = response.data;
      } catch (err) {
        this.error = 'Failed to load requests.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
