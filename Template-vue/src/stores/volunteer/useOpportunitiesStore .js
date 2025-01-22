import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = "http://localhost:5000/api/posts";

export const useOpportunitiesStore = defineStore('opportunities', {
  state: () => ({
    opportunities: [],
    selectedOpportunity: null,
    loading: false,
    error: null,
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    async addOpportunity(opportunity) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(API_URL, opportunity, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
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
      this.loading = true;
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.opportunities = response.data;
      } catch (error) {
        console.error('Error fetching opportunities:', error);
        this.error = error.response?.data?.message || "An error occurred.";
      } finally {
        this.loading = false;
      }
    },

    async deleteOpportunity(id) {
      try {
        await axios.delete(`${API_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.opportunities = this.opportunities.filter((opportunity) => opportunity.id !== id);
      } catch (error) {
        console.error('Error deleting opportunity:', error);
        this.error = error.response?.data?.message || "An error occurred.";
      }
    },

   /*  async acceptRequest(opportunityId, requestId) {
      try {
        await axios.post(`${API_URL}/${opportunityId}/requests/${requestId}/accept`, null, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        alert('Request accepted successfully!');
      } catch (error) {
        console.error('Error accepting request:', error);
        this.error = error.response?.data?.message || "An error occurred.";
      }
    },*/

    selectOpportunity(opportunity) {
      this.selectedOpportunity = opportunity;
    },

    closeOpportunity() {
      this.selectedOpportunity = null;
    },
  },
});
