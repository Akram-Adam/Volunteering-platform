<template>
  <div class="requester-overview bg-gray-100 min-h-screen p-6">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        Requester Dashboard Overview
      </h1>

      <!-- Statistics Cards (Updated layout) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <!-- Total Requests -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-700 mb-2">Total Requests</h2>
          <p class="text-4xl font-semibold text-blue-500">{{ stats.totalRequests }}</p>
        </div>
        <!-- Completed Requests -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-700 mb-2">Completed Requests</h2>
          <p class="text-4xl font-semibold text-green-500">{{ stats.completedRequests }}</p>
        </div>
        <!-- Pending Requests -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-700 mb-2">Pending Requests</h2>
          <p class="text-4xl font-semibold text-yellow-500">{{ stats.pendingRequests }}</p>
        </div>
        <!-- Canceled Requests -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-700 mb-2">Canceled Requests</h2>
          <p class="text-4xl font-semibold text-red-500">{{ stats.canceledRequests }}</p>
        </div>
      </div>

      <!-- Filters Section -->
      <div class="flex justify-center space-x-6 mb-8">
        <button
          @click="filterRequests('all')"
          class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          All Requests
        </button>
        <button
          @click="filterRequests('pending')"
          class="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
        >
          Pending Requests
        </button>
        <button
          @click="filterRequests('completed')"
          class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Completed Requests
        </button>
        <button
          @click="filterRequests('canceled')"
          class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
        >
          Canceled Requests
        </button>
        <!-- Active Requests Filter -->
        <button
          @click="filterRequests('active')"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Active Requests
        </button>
      </div>

      <!-- Search by Date -->
      <div class="mb-8 flex justify-between items-center">
        <div>
          <label for="startDate" class="mr-4">Start Date:</label>
          <input
            type="date"
            v-model="searchStartDate"
            class="border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label for="endDate" class="ml-4 mr-4">End Date:</label>
          <input
            type="date"
            v-model="searchEndDate"
            class="border border-gray-300 rounded p-2"
          />
        </div>
        <button
          @click="filterByDate"
          class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 ml-4"
        >
          Filter by Date
        </button>
      </div>

      <!-- Requests Section -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-700 mb-4">{{ dynamicTableTitle }} Requests</h2>

        <!-- Table for Filtered Requests -->
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white border border-gray-200">
            <thead>
              <tr class="bg-gray-100">
                <th class="py-3 px-6 text-left text-sm font-semibold text-gray-700">Request Title</th>
                <th class="py-3 px-6 text-left text-sm font-semibold text-gray-700">Request Description</th>
                <th class="py-3 px-6 text-left text-sm font-semibold text-gray-700">Request Date</th>
                <th class="py-3 px-6 text-left text-sm font-semibold text-gray-700">Volunteer Name</th>
                <th class="py-3 px-6 text-left text-sm font-semibold text-gray-700">Volunteer Contact</th>
                <th class="py-3 px-6 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="request in filteredRequests" :key="request.id" class="border-t border-gray-200">
                <td class="py-3 px-6 text-sm text-gray-800">{{ request.title }}</td>
                <td class="py-3 px-6 text-sm text-gray-600">{{ request.description }}</td>
                <td class="py-3 px-6 text-sm text-gray-600">{{ formatDate(request.date) }}</td>
                <td class="py-3 px-6 text-sm text-gray-600">{{ request.volunteer?.name || 'N/A' }}</td>
                <td class="py-3 px-6 text-sm text-gray-600">{{ request.volunteer?.contact || 'N/A' }}</td>
                <td class="py-3 px-6 text-sm text-gray-600">{{ request.status }}</td>
              </tr>
            </tbody>
          </table>
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
      allRequests: [
        {
          id: 1,
          title: "Need Help with Gardening",
          description: "Looking for someone to help with gardening tasks this weekend.",
          status: "Active",
          date: "2025-01-05",
        },
        {
          id: 2,
          title: "Tech Support for Setting Up a PC",
          description: "Need assistance setting up my new computer at home.",
          status: "Pending",
          date: "2025-01-06",
        },
        {
          id: 3,
          title: "Tutoring for Math",
          description: "Looking for a volunteer to tutor my child in algebra.",
          status: "Completed",
          date: "2025-01-07",
          volunteer: {
            name: "John Doe",
            contact: "john.doe@example.com",
          },
        },
        {
          id: 4,
          title: "Community Event Setup",
          description: "Looking for volunteers to help set up an event this Saturday.",
          status: "Canceled",
          date: "2025-01-08",
        },
      ],
      currentFilter: "all", // "all", "pending", "completed", "canceled", or "active"
      searchStartDate: "",
      searchEndDate: "",
    };
  },
  computed: {
    filteredRequests() {
      let requests = this.allRequests;

      // Filter by status
      if (this.currentFilter !== "all") {
        requests = requests.filter(
          (request) => request.status.toLowerCase() === this.currentFilter
        );
      }

      // Filter by date range
      if (this.searchStartDate) {
        requests = requests.filter((request) => request.date >= this.searchStartDate);
      }
      if (this.searchEndDate) {
        requests = requests.filter((request) => request.date <= this.searchEndDate);
      }

      return requests;
    },
    dynamicTableTitle() {
      switch (this.currentFilter) {
        case "pending":
          return "Pending";
        case "completed":
          return "Completed";
        case "canceled":
          return "Canceled";
        case "active":
          return "Active";
        default:
          return "All";
      }
    },
    stats() {
      return {
        totalRequests: this.allRequests.length,
        completedRequests: this.allRequests.filter((request) => request.status === "Completed").length,
        pendingRequests: this.allRequests.filter((request) => request.status === "Pending").length,
        canceledRequests: this.allRequests.filter((request) => request.status === "Canceled").length,
      };
    },
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    },
    filterRequests(status) {
      this.currentFilter = status;
    },
    filterByDate() {
      // For filtering by date. Customize as per requirements.
      this.currentFilter = "active";
    },
  },
};
</script>

<style scoped>
/* Add styles as needed */
</style>
