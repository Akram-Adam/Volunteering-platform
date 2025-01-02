<template>
  <div class="post-opportunity-page p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Post a Volunteer Opportunity</h1>
    <form @submit.prevent="submitOpportunity">
      <div class="mb-4">
        <label for="title" class="block font-semibold mb-2">Title</label>
        <input
          id="title"
          v-model="opportunity.title"
          type="text"
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label for="description" class="block font-semibold mb-2">Description</label>
        <textarea
          id="description"
          v-model="opportunity.description"
          rows="4"
          class="w-full p-2 border rounded"
          required
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="category" class="block font-semibold mb-2">Category</label>
        <select v-model="opportunity.category" class="w-full p-2 border rounded" required>
          <option value="">Select a category</option>
          <option value="education">Education</option>
          <option value="environment">Environment</option>
          <option value="health">Health</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="availability" class="block font-semibold mb-2">Availability</label>
        <input
          id="availability"
          v-model="opportunity.availability"
          type="date"
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label for="location" class="block font-semibold mb-2">Location</label>
        <input
          id="location"
          v-model="opportunity.location"
          type="text"
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label for="maxRequesters" class="block font-semibold mb-2">Maximum Number of Requesters</label>
        <input
          id="maxRequesters"
          v-model.number="opportunity.maxRequesters"
          type="number"
          class="w-full p-2 border rounded"
          min="1"
          required
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { OpportunityService } from "@/services/OpportunityService";

export default {
  name: "PostOpportunity",
  data() {
    return {
      opportunity: {
        title: "",
        description: "",
        category: "",
        availability: "",
        location: "",
        maxRequesters: 1, // Default to 1
      },
    };
  },
  methods: {
    submitOpportunity() {
      OpportunityService.add(this.opportunity);
      alert("Volunteer opportunity added!");
      this.$router.push("/volunteer-dashboard"); // Redirect to the volunteer dashboard
    },
  },
};
</script>

<style scoped>
.post-opportunity-page {
  font-family: Arial, sans-serif;
}
</style>
