<template>
  <div class="volunteer-opportunities p-6">
    <h1 class="text-3xl font-bold text-center mb-8">Volunteer Opportunities</h1>
    <!-- Search and Filter Section -->
    <div class="search-filter mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <input
        type="text"
        placeholder="Search opportunities..."
        class="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3"
        v-model="searchQuery"
      />
      <select
        class="border border-gray-300 rounded-md px-4 py-2"
        v-model="selectedCategory"
      >
        <option value="">All Categories</option>
        <option value="environment">Environment</option>
        <option value="education">Education</option>
        <option value="health">Health</option>
      </select>
    </div>

    <!-- Opportunities List -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="opportunity in filteredOpportunities"
        :key="opportunity.id"
        class="opportunity-card bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
      >
        <h2 class="text-xl font-bold mb-2">{{ opportunity.title }}</h2>
        <p class="text-sm text-gray-600 mb-4">{{ opportunity.description }}</p>
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          @click="viewDetails(opportunity.id)"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VolunteerOpportunities",
  data() {
    return {
      opportunities: [
        {
          id: 1,
          title: "Beach Cleanup Drive",
          description: "Help clean up our local beaches this weekend.",
          category: "environment",
        },
        {
          id: 2,
          title: "Tutoring Underprivileged Children",
          description: "Join us in teaching kids basic math and reading skills.",
          category: "education",
        },
        {
          id: 3,
          title: "Blood Donation Camp",
          description: "Donate blood and save lives at our organized camp.",
          category: "health",
        },
      ],
      searchQuery: "",
      selectedCategory: "",
    };
  },
  computed: {
    filteredOpportunities() {
      return this.opportunities.filter((opportunity) => {
        const matchesCategory =
          this.selectedCategory === "" ||
          opportunity.category === this.selectedCategory;
        const matchesSearch =
          opportunity.title
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          opportunity.description
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    },
  },
  methods: {
    viewDetails(id) {
      this.$router.push(`/opportunity/${id}`);
    },
  },
};
</script>

<style scoped>
.volunteer-opportunities {
  font-family: "Arial", sans-serif;
}
</style>
