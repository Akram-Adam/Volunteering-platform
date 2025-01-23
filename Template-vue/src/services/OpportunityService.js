// src/services/OpportunityService.js

const STORAGE_KEY = "volunteerOpportunities";

export const OpportunityService = {
  getAll() {
    const opportunities = localStorage.getItem(STORAGE_KEY);
    return opportunities ? JSON.parse(opportunities) : [];
  },
  add(opportunity) {
    const opportunities = this.getAll();
    opportunities.push(opportunity);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities));
  },
};
