<template>
  <div class="opportunity-list-page p-6">
    <h1 class="text-3xl font-bold mb-6">Available Opportunities</h1>

    <!-- Search and Filter Section -->
    <div class="mb-6 flex flex-wrap gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search opportunities..."
        class="p-2 border rounded w-full md:w-1/3"
      />
      <select
        v-model="selectedCategory"
        class="p-2 border rounded w-full md:w-1/3"
      >
        <option value="">All Categories</option>
        <option value="education">Education</option>
        <option value="environment">Environment</option>
        <option value="health">Health</option>
      </select>
    </div>

    <!-- Opportunity List -->
    <div v-if="filteredOpportunities.length" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="opportunity in filteredOpportunities"
        :key="opportunity.id"
        class="p-6 bg-white rounded-lg shadow-md"
      >
        <h2 class="text-xl font-semibold">{{ opportunity.title }}</h2>
        <p class="text-gray-600 mb-2">{{ opportunity.description }}</p>
        <p class="text-sm text-gray-500 mb-2">
          <strong>Category:</strong> {{ opportunity.category }}
        </p>
        <p class="text-sm text-gray-500 mb-2">
          <strong>Location:</strong> {{ opportunity.location }}
        </p>
        <p class="text-sm text-gray-500 mb-2">
          <strong>Date:</strong> {{ opportunity.availability }}
        </p>
        <p
          class="text-sm text-gray-500 mb-4"
          :class="{ 'text-red-500': isOpportunityFull(opportunity) }"
        >
          <strong>Spots Left:</strong> {{
            opportunity.maxRequesters - opportunity.currentRequesters
          }}
        </p>
        <button
          :disabled="isOpportunityFull(opportunity)"
          @click="requestOpportunity(opportunity)"
          class="px-4 py-2 rounded text-white transition"
          :class="{
            'bg-blue-500 hover:bg-blue-600': !isOpportunityFull(opportunity),
            'bg-gray-400 cursor-not-allowed': isOpportunityFull(opportunity),
          }"
        >
          {{ isOpportunityFull(opportunity) ? 'Full' : 'Request' }}
        </button>
      </div>
    </div>

    <p v-else class="text-center text-gray-600">No opportunities available.</p>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import mockOpportunities from "@/data/mockOpportunities"; // Import mock data

export default {
  name: "RequesterOpportunityList",
  setup() {
    const opportunities = ref(mockOpportunities);
    const searchQuery = ref("");
    const selectedCategory = ref("");

    const filteredOpportunities = computed(() => {
      return opportunities.value.filter((opportunity) => {
        const matchesSearch = opportunity.title
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
        const matchesCategory =
          !selectedCategory.value ||
          opportunity.category === selectedCategory.value;
        return matchesSearch && matchesCategory;
      });
    });

    const isOpportunityFull = (opportunity) =>
      opportunity.currentRequesters >= opportunity.maxRequesters;

    const requestOpportunity = (opportunity) => {
      if (!isOpportunityFull(opportunity)) {
        opportunity.currentRequesters += 1;
        alert(`You have successfully requested: ${opportunity.title}`);
      } else {
        alert("This opportunity is full and cannot be requested.");
      }
    };

    return {
      opportunities,
      searchQuery,
      selectedCategory,
      filteredOpportunities,
      isOpportunityFull,
      requestOpportunity,
    };
  },
};
</script>

<style scoped>
.opportunity-list-page {
  font-family: Arial, sans-serif;
}
button:disabled {
  cursor: not-allowed;
}
</style>
