<template>
  <div class="opportunity-list-page bg-gray-100 min-h-screen">
    <!-- Header Section -->
    <header class="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 text-center">
      <h1 class="text-3xl font-bold">Explore Opportunities</h1>
      <p class="text-lg mt-2">Find and request volunteer opportunities that suit your needs!</p>
    </header>

    <!-- Opportunity Cards Section -->
    <div v-if="loading" class="p-6 text-center text-gray-600">Loading opportunities...</div>
    <div v-else class="opportunity-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <div
        v-for="opportunity in opportunities"
        :key="opportunity.id"
        class="bg-white p-4 rounded shadow hover:shadow-lg transition"
      >
        <h2 class="text-xl font-bold mb-2">{{ opportunity.title }}</h2>
        <p class="text-gray-700">{{ opportunity.description }}</p>
        <div class="text-sm text-gray-500 mt-2">
          <p>Location: {{ opportunity.location }}</p>
          <p>Availability: {{ opportunity.availability }}</p>
        </div>
        <button
          class="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          @click="requestOpportunity(opportunity.id)"
          :disabled="requestingId === opportunity.id"
        >
          <span v-if="requestingId === opportunity.id">Requesting...</span>
          <span v-else>Request Opportunity</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "OpportunityList",
  setup() {
    const opportunities = ref([]);
    const loading = ref(true);
    const requestingId = ref(null);

    const fetchOpportunities = async () => {
      loading.value = true;
      // Mock opportunity data
      setTimeout(() => {
        opportunities.value = [
          {
            id: 1,
            title: "Community Clean-up",
            description: "Help us clean up our local park and make it beautiful again.",
            location: "City Park",
            availability: "January 15, 2024",
          },
          {
            id: 2,
            title: "Food Bank Volunteer",
            description: "Assist in sorting and distributing food to families in need.",
            location: "Downtown Food Bank",
            availability: "January 20, 2024",
          },
        ];
        loading.value = false;
      }, 1000);
    };

    const requestOpportunity = async (id) => {
      try {
        requestingId.value = id;
        // Using jsonplaceholder.typicode.com to mock the API
        const response = await axios.post(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            opportunityId: id,
            userId: 123, // Example user ID
          }
        );
        alert(`Mock Request Sent Successfully! Response ID: ${response.data.id}`);
      } catch (error) {
        alert("Failed to send the request. Please try again.");
        console.error(error);
      } finally {
        requestingId.value = null;
      }
    };

    onMounted(fetchOpportunities);

    return {
      opportunities,
      loading,
      requestingId,
      requestOpportunity,
    };
  },
};
</script>
