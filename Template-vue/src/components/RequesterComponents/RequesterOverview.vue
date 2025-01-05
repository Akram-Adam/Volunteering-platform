<template>
  <div class="requester-overview bg-gray-100 min-h-screen p-6">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        Requester Dashboard Overview
      </h1>
      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- Total Posted Requests -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-700 mb-2">Total Posted Requests</h2>
          <p class="text-4xl font-semibold text-blue-500">{{ stats.postedRequests }}</p>
        </div>
        <!-- Active Requests -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-700 mb-2">Active Requests</h2>
          <p class="text-4xl font-semibold text-green-500">{{ stats.activeRequests }}</p>
        </div>
        <!-- Completed Requests -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-700 mb-2">Completed Requests</h2>
          <p class="text-4xl font-semibold text-gray-500">{{ stats.completedRequests }}</p>
        </div>
      </div>

      <!-- Active Requests Section -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-700 mb-4">Active Requests</h2>
        <div class="space-y-4">
          <div
            v-for="request in activeRequests"
            :key="request.id"
            class="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <!-- Request Details -->
            <div>
              <h3 class="text-lg font-bold text-gray-800">{{ request.title }}</h3>
              <p class="text-sm text-gray-600">{{ request.description }}</p>
              <span
                :class="statusClass(request.status)"
                class="text-xs font-semibold px-2 py-1 rounded inline-block mt-2"
              >
                {{ request.status }}
              </span>
            </div>
            <!-- Action Buttons -->
            <div class="flex space-x-2">
              <button
                @click="viewRequestDetails(request.id)"
                class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm"
              >
                View Details
              </button>
              <button
                v-if="request.status === 'Active'"
                @click="cancelRequest(request.id)"
                class="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
              >
                Cancel Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RequesterOverview",
  data() {
    return {
      stats: {
        postedRequests: 12, // Replace with actual data from backend
        activeRequests: 5,
        completedRequests: 7,
      },
      recentRequests: [
        {
          id: 1,
          title: "Need Help with Gardening",
          description: "Looking for someone to help with gardening tasks this weekend.",
          status: "Active",
        },
        {
          id: 2,
          title: "Tech Support for Setting Up a PC",
          description: "Need assistance setting up my new computer at home.",
          status: "Pending",
        },
        {
          id: 3,
          title: "Tutoring for Math",
          description: "Looking for a volunteer to tutor my child in algebra.",
          status: "Completed",
        },
      ],
    };
  },
  computed: {
    activeRequests() {
      return this.recentRequests.filter((request) => request.status === "Active");
    },
  },
  methods: {
    viewRequestDetails(id) {
      alert(`Viewing details for request ID: ${id}`);
      // Navigate to request details page or handle logic
    },
    cancelRequest(id) {
      if (confirm("Are you sure you want to cancel this request?")) {
        const requestIndex = this.recentRequests.findIndex((req) => req.id === id);
        if (requestIndex !== -1) {
          this.recentRequests.splice(requestIndex, 1); // Remove request from the list
          this.stats.activeRequests -= 1; // Update active request count
          alert("Request canceled successfully.");
        }
      }
    },
    statusClass(status) {
      switch (status) {
        case "Active":
          return "bg-green-100 text-green-700";
        case "Pending":
          return "bg-yellow-100 text-yellow-700";
        case "Completed":
          return "bg-gray-200 text-gray-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    },
  },
};
</script>

<style scoped>
.requester-overview {
  font-family: "Arial", sans-serif;
}

.grid {
  gap: 1.5rem;
}

h1,
h2 {
  font-family: "Roboto", sans-serif;
}
</style>
