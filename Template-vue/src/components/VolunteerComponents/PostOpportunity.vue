<template>
  <div class="post-opportunity-page p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Post a Volunteer Opportunity</h1>
    <form @submit.prevent="submitOpportunity">
      <div v-if="error" class="mb-4 text-red-600 font-semibold">
        {{ error }}
      </div>
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
        <select v-model="opportunity.location" class="w-full p-2 border rounded" required>
          <option value="">Select a location</option>
            <option value="Algeria">Algeria</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Comoros">Comoros</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Egypt">Egypt</option>
            <option value="Iraq">Iraq</option>
            <option value="Jordan">Jordan</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Libya">Libya</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Morocco">Morocco</option>
            <option value="Oman">Oman</option>
            <option value="Palestine">Palestine</option>
            <option value="Qatar">Qatar</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Somalia">Somalia</option>
            <option value="Sudan">Sudan</option>
            <option value="Syria">Syria</option>
            <option value="Tunisia">Tunisia</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="Yemen">Yemen</option>
        </select>
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
        :disabled="loading"
        class="bg-[#3E5879] text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {{ loading ? "Submitting..." : "Submit" }}
      </button>
    </form>
  </div>
</template>

<script>
import { useOpportunityStore } from "@/stores/opportunityStore.js";
import { reactive } from "vue";

export default {
  name: "PostOpportunity",
  setup() {
    const opportunityStore = useOpportunityStore();

    const opportunity = reactive({
      title: "",
      description: "",
      category: "",
      availability: "",
      location: "",
      maxRequesters: 1,
    });

    const submitOpportunity = async () => {
      try {
        await opportunityStore.addOpportunity(opportunity);
        alert("Volunteer opportunity added!");
        // Redirect to another page
        window.location.href = "/volunteer-dashboard";
      } catch (error) {
        console.error("Submission failed:", error);
      }
    };

    return {
      opportunity,
      submitOpportunity,
      loading: opportunityStore.loading,
      error: opportunityStore.error,
    };
  },
};
</script>

<style scoped>
.post-opportunity-page {
  font-family: Arial, sans-serif;
}
</style>
