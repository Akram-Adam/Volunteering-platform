import { defineStore } from 'pinia';
import axios from 'axios';
import { toast } from 'vue3-toastify';

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
        toast.success("Opportunity added successfully!");
        return response.data;
      } catch (error) {
        console.error("Error adding opportunity:", error);
        this.error = error.response?.data?.message || "An error occurred.";
        toast.error(this.error);
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
      //  toast.success("Opportunities fetched successfully!");
      } catch (error) {
        console.error('Error fetching opportunities:', error);
        this.error = error.response?.data?.message || "An error occurred.";
        toast.error(this.error);
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
        toast.success("Opportunity deleted successfully!");
      } catch (error) {
        console.error('Error deleting opportunity:', error);
        this.error = error.response?.data?.message || "An error occurred.";
        toast.error(this.error);
      }
    },

    selectOpportunity(opportunity) {
      this.selectedOpportunity = opportunity;
      toast.info(`Selected opportunity: ${opportunity.title}`);
    },

    closeOpportunity() {
      this.selectedOpportunity = null;
      toast.info("Opportunity selection cleared.");
    },
  },
});
