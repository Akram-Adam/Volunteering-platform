<template>
  <div class="requester-overview bg-gray-50 min-h-screen p-6">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold text-blue-700 mb-6 text-center">
        Requester Dashboard Overview
      </h1>

      <!-- Statistics Cards (Updated layout) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <!-- Total Requests -->
        <div class="bg-blue-50 shadow-md rounded-lg p-6">
          <h2 class="text-xl font-bold text-blue-600 mb-2">Total Requests</h2>
          <p class="text-4xl font-semibold text-blue-500">{{ stats.totalRequests }}</p>
        </div>
        <!-- Completed Requests -->
        <div class="bg-green-50 shadow-md rounded-lg p-6">
          <h2 class="text-xl font-bold text-green-600 mb-2">Completed Requests</h2>
          <p class="text-4xl font-semibold text-green-500">{{ stats.completedRequests }}</p>
        </div>
        <!-- Pending Requests -->
        <div class="bg-yellow-50 shadow-md rounded-lg p-6">
          <h2 class="text-xl font-bold text-yellow-600 mb-2">Pending Requests</h2>
          <p class="text-4xl font-semibold text-yellow-500">{{ stats.pendingRequests }}</p>
        </div>
        <!-- Canceled Requests -->
        <div class="bg-red-50 shadow-md rounded-lg p-6">
          <h2 class="text-xl font-bold text-red-600 mb-2">Canceled Requests</h2>
          <p class="text-4xl font-semibold text-red-500">{{ stats.canceledRequests }}</p>
        </div>
      </div>

      <!-- Filters Section -->
      <div class="flex justify-center space-x-6 mb-8">
        <button
          @click="filterRequests('all')"
          class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
        >
          All Requests
        </button>
        <button
          @click="filterRequests('pending')"
          class="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300"
        >
          Pending Requests
        </button>
        <button
          @click="filterRequests('completed')"
          class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-300"
        >
          Completed Requests
        </button>
        <button
          @click="filterRequests('canceled')"
          class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-300"
        >
          Canceled Requests
        </button>
        <button
          @click="filterRequests('active')"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
        >
          Active Requests
        </button>
      </div>

      <!-- Search by Date -->
      <div class="mb-8 flex justify-between items-center">
        <div>
          <label for="startDate" class="mr-4 font-medium text-gray-700">Start Date:</label>
          <input
            type="date"
            v-model="searchStartDate"
            class="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div>
          <label for="endDate" class="ml-4 mr-4 font-medium text-gray-700">End Date:</label>
          <input
            type="date"
            v-model="searchEndDate"
            class="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <button
          @click="filterByDate"
          class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 ml-4"
        >
          Filter by Date
        </button>
      </div>

      <!-- Requests Section -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold text-blue-700 mb-4">{{ dynamicTableTitle }} Requests</h2>

        <!-- Table for Filtered Requests -->
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white border border-gray-200">
            <thead>
              <tr class="bg-blue-100">
                <th class="py-3 px-6 text-left text-sm font-semibold text-blue-700">Request Title</th>
                <th class="py-3 px-6 text-left text-sm font-semibold text-blue-700">Request Description</th>
                <th class="py-3 px-6 text-left text-sm font-semibold text-blue-700">Request Date</th>
                <th class="py-3 px-6 text-left text-sm font-semibold text-blue-700">Volunteer Name</th>
                <th class="py-3 px-6 text-left text-sm font-semibold text-blue-700">Volunteer Contact</th>
                <th class="py-3 px-6 text-left text-sm font-semibold text-blue-700">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="request in filteredRequests" :key="request.id" class="border-t border-gray-200 hover:bg-gray-100">
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
import { useRequestStore } from '@/stores/requester/requestStore';

export default {
  data() {
    return {
      currentFilter: 'all',
      searchStartDate: null,
      searchEndDate: null,
    };
  },
  computed: {
    stats() {
      return this.requestStore.stats;
    },
    filteredRequests() {
      return this.requestStore.filteredRequests(
        this.currentFilter,
        this.searchStartDate,
        this.searchEndDate
      );
    },
  },
  methods: {
    applyDateFilter() {
//Just updating the data for now
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
  created() {
    this.requestStore.fetchRequests();
  },
  setup() {
    const requestStore = useRequestStore();
    return { requestStore };
  },
};
</script>
