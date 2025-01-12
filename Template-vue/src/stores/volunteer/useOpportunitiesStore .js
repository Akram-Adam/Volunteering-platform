import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = "https://api.example.com/opportunities";
export const useOpportunitiesStore = defineStore('opportunities', {
  state: () => ({
    opportunities: [],
    selectedOpportunity: null,
    loading: false,
    error: null,
  }),
  actions: {
    async addOpportunity(opportunity) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(API_URL, opportunity);
        this.opportunities.push(response.data);
        return response.data;
      } catch (error) {
        console.error("Error adding opportunity:", error);
        this.error = error.response?.data?.message || "An error occurred.";
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async fetchOpportunities() {
      try {
        const response = await axios.get(API_URL);
        this.opportunities = response.data;
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      }
    },
    async deleteOpportunity(id) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        this.opportunities = this.opportunities.filter((opportunity) => opportunity.id !== id);
      } catch (error) {
        console.error('Error deleting opportunity:', error);
      }
    },
    async acceptRequest(opportunityId, requestId) {
      try {
        await axios.post(`${API_URL}/${opportunityId}/requests/${requestId}/accept`);
        alert('Request accepted successfully!');
      } catch (error) {
        console.error('Error accepting request:', error);
      }
    },
    selectOpportunity(opportunity) {
      this.selectedOpportunity = opportunity;
    },
    closeOpportunity() {
      this.selectedOpportunity = null;
    },
  },
});
