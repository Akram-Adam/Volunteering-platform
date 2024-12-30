<template>
  <div class="find-volunteering-opportunity">
    <h1 class="text-2xl font-bold mb-4">Find Volunteering Opportunities</h1>
    <!-- Search Bar (optional) -->
    <div class="search-bar mb-4">
      <input v-model="searchQuery" type="text" placeholder="Search opportunities..." class="p-2 border rounded" />
      <button @click="searchOpportunities" class="bg-[#3E5879] text-white p-2 rounded">Search</button>
    </div>

    <!-- Opportunities List -->
    <div class="opportunities-list">
      <div v-for="opportunity in filteredOpportunities" :key="opportunity.id" class="opportunity-card bg-white shadow-lg rounded p-4 mb-4">
        <h3 class="font-bold text-xl">{{ opportunity.title }}</h3>
        <p class="text-gray-700">{{ opportunity.description }}</p>
        <p class="text-sm text-gray-500">{{ opportunity.date }} | {{ opportunity.location }}</p>

        <!-- Request Button or Status Indicator -->
        <div v-if="opportunity.Requested" class="status-Requested text-gray-500">
          <span>Requested</span>
        </div>
        <div v-else>
          <button @click="requestOpportunity(opportunity)" class="bg-[#3E5879] text-white p-2 rounded hover:bg-[#D8C4B6] transition">
            Request
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      opportunities: [
        { id: 1, title: 'Community Clean-Up', description: 'Help clean up the local park.', date: '2024-12-30', location: 'City Park', Requested: false },
        { id: 2, title: 'Food Bank Volunteering', description: 'Assist with sorting food donations.', date: '2024-12-28', location: 'Downtown Food Bank', Requested: false },
        { id: 3, title: 'Animal Shelter Support', description: 'Assist with caring for animals.', date: '2024-12-27', location: 'Animal Shelter', Requested: false }
      ]
    };
  },
  computed: {
    // Filter opportunities based on search query
    filteredOpportunities() {
      return this.opportunities.filter(opportunity => {
        return opportunity.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  methods: {
    // Handle opportunity request
    requestOpportunity(opportunity) {
      opportunity.Requested = true;
      // Update opportunity status in the backend or localStorage here (e.g., send a request to the backend API)
    },
    // Handle searching opportunities (optional, if more filtering is needed)
    searchOpportunities() {
      // You can implement more advanced search or filtering logic here
    }
  }
};
</script>

<style scoped>
.find-opportunities {
  padding: 20px;
}

.opportunity-card {
  transition: transform 0.3s;
}

.opportunity-card:hover {
  transform: translateY(-5px);
}

.status-Requested {
  background-color: #e0e0e0;
  padding: 5px;
  border-radius: 5px;
}
</style>
