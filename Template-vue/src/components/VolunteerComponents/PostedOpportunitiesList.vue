<template>
  <div class="posted-opportunities bg-gray-100 min-h-screen py-8">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Volunteer Opportunities
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="opportunity in opportunitiesStore.opportunities"
          :key="opportunity.id"
          class="bg-white shadow-md rounded-lg p-6 relative"
        >
          <h2 class="text-xl font-bold text-gray-700 mb-2">{{ opportunity.title }}</h2>
          <p class="text-gray-600 mb-4 truncate">{{ opportunity.description }}</p>
          <p class="text-sm font-medium text-blue-600 mb-2">Category: {{ opportunity.category }}</p>
          <p class="text-sm text-gray-600 mb-2">Availability: {{ opportunity.availability }}</p>
          <p class="text-sm text-gray-600 mb-4">Location: {{ opportunity.location }}</p>
          <div class="flex justify-between items-center">
            <button
              @click="editOpportunity(opportunity.id)"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            >
              Edit
            </button>
            <button
              @click="opportunitiesStore.deleteOpportunity(opportunity.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Delete
            </button>
            <button
              @click="viewRequests(opportunity)"
              class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
            >
              View Requests
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Viewing Requests -->
    <div
      v-if="opportunitiesStore.selectedOpportunity"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded shadow-lg">
        <h3 class="text-2xl font-bold mb-4 text-gray-800">
          Requests for: {{ opportunitiesStore.selectedOpportunity.title }}
        </h3>
        <ul class="space-y-4">
          <li
            v-for="request in opportunitiesStore.selectedOpportunity.requests"
            :key="request.id"
            class="p-4 bg-gray-100 rounded-lg shadow-md"
          >
            <p><strong>Requester Name:</strong> {{ request.name }}</p>
            <p>
              <strong>Contact (WhatsApp):</strong>
              <a
                :href="'https://wa.me/' + request.whatsapp"
                target="_blank"
                class="text-blue-500 underline"
              >
                {{ request.whatsapp }}
              </a>
            </p>
            <p><strong>Contact (Email):</strong> {{ request.email }}</p>
            <p><strong>Message:</strong> {{ request.message }}</p>
            <div class="flex justify-end mt-4 space-x-4">
              <button
                @click="opportunitiesStore.closeOpportunity"
                class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
              <button
                @click="opportunitiesStore.acceptRequest(opportunitiesStore.selectedOpportunity.id, request.id)"
                class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Accept
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useOpportunitiesStore } from "@/stores/opportunities";

export default {
  name: "PostedOpportunitiesList",
  setup() {
    const opportunitiesStore = useOpportunitiesStore();
    opportunitiesStore.fetchOpportunities();

    return {
      opportunitiesStore,
    };
  },
  methods: {
    editOpportunity(id) {
      alert(`Edit opportunity with ID: ${id}`);
    },
    viewRequests(opportunity) {
      this.opportunitiesStore.selectOpportunity(opportunity);
    },
  },
};
</script>
