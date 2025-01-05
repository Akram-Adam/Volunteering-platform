<template>
  <div class="Posted-Opportunities-List bg-gray-100 min-h-screen py-8">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Volunteer Opportunities
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="opportunity in opportunities"
          :key="opportunity.id"
          class="bg-white shadow-md rounded-lg p-6 relative"
        >
          <!-- Opportunity Title -->
          <h2 class="text-xl font-bold text-gray-700 mb-2">{{ opportunity.title }}</h2>
          <!-- Description -->
          <p class="text-gray-600 mb-4 truncate">{{ opportunity.description }}</p>
          <!-- Category -->
          <p class="text-sm font-medium text-blue-600 mb-2">
            Category: {{ opportunity.category }}
          </p>
          <!-- Availability -->
          <p class="text-sm text-gray-600 mb-2">Availability: {{ opportunity.availability }}</p>
          <!-- Location -->
          <p class="text-sm text-gray-600 mb-4">Location: {{ opportunity.location }}</p>
          <!-- Action Buttons -->
          <div class="flex justify-between items-center">
            <button
              @click="editOpportunity(opportunity.id)"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            >
              Edit
            </button>
            <button
              @click="deleteOpportunity(opportunity.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Delete
            </button>
            <button
              @click="viewRequests(opportunity.id)"
              class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
            >
              View Requests
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostedOpportunitiesList",
  data() {
    return {
      opportunities: [
        {
          id: 1,
          title: "Community Cleanup",
          description: "Join us in cleaning our local park.",
          category: "Environment",
          availability: "Weekends",
          location: "Central Park",
        },
        {
          id: 2,
          title: "Tutoring Program",
          description: "Help children improve their math skills.",
          category: "Education",
          availability: "Evenings",
          location: "Downtown Library",
        },
        {
          id: 3,
          title: "Food Drive",
          description: "Assist in organizing and distributing food.",
          category: "Community",
          availability: "Weekdays",
          location: "Community Center",
        },
      ],
    };
  },
  methods: {
    editOpportunity(id) {
      alert(`Edit opportunity with ID: ${id}`);
      // Navigate to edit page or trigger modal
    },
    deleteOpportunity(id) {
      if (confirm("Are you sure you want to delete this opportunity?")) {
        this.opportunities = this.opportunities.filter(
          (opportunity) => opportunity.id !== id
        );
        alert("Opportunity deleted.");
      }
    },
    viewRequests(id) {
      alert(`View requests for opportunity with ID: ${id}`);
      // Navigate to requests page
    },
  },
};
</script>

<style scoped>
.volunteer-opportunities-list {
  font-family: "Arial", sans-serif;
}
</style>
