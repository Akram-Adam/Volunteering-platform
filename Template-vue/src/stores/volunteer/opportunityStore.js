import { defineStore } from "pinia";
import axios from "axios";

const API_URL = "http://localhost:5000/api/posts";

export const useOpportunityStore = defineStore("opportunity", {
  state: () => ({
    opportunities: [],
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
  },
});
