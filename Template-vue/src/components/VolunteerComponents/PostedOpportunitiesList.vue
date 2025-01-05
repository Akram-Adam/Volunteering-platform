<template>
  <div class="posted-opportunities bg-gray-100 min-h-screen py-8">
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

    <!-- Modal for Viewing Requests -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded shadow-lg">
        <h3 class="text-2xl font-bold mb-4 text-gray-800">
          Requests for: {{ selectedOpportunity?.title }}
        </h3>
        <ul class="space-y-4">
          <li
            v-for="request in selectedOpportunity?.requests"
            :key="request.id"
            class="p-4 bg-gray-100 rounded-lg shadow-md"
          >
            <p><strong>Opportunity Name:</strong> {{ selectedOpportunity.title }}</p>
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
                @click="closeModal"
                class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
              <button
                @click="acceptRequest(request.id)"
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
          requests: [
            {
              id: 1,
              name: "John Doe",
              whatsapp: "1234567890",
              email: "john@example.com",
              message: "I need help cleaning up my backyard.",
            },
            {
              id: 2,
              name: "Jane Smith",
              whatsapp: "0987654321",
              email: "jane@example.com",
              message: "I would like assistance in organizing a cleanup event.",
            },
          ],
        },
        {
          id: 2,
          title: "Tutoring Program",
          description: "Help children improve their math skills.",
          category: "Education",
          availability: "Evenings",
          location: "Downtown Library",
          requests: [
            {
              id: 1,
              name: "Alice Johnson",
              whatsapp: "1112223333",
              email: "alice@example.com",
              message: "I need tutoring for my child in mathematics.",
            },
          ],
        },
        {
          id: 3,
          title: "Food Drive",
          description: "Assist in organizing and distributing food.",
          category: "Community",
          availability: "Weekdays",
          location: "Community Center",
          requests: [
            {
              id: 1,
              name: "Mark Lee",
              whatsapp: "4445556666",
              email: "mark@example.com",
              message: "I require help organizing a food drive in my area.",
            },
          ],
        },
      ],
      showModal: false,
      selectedOpportunity: null,
    };
  },
  methods: {
    editOpportunity(id) {
      alert(`Edit opportunity with ID: ${id}`);
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
      const opportunity = this.opportunities.find((op) => op.id === id);
      if (opportunity) {
        this.selectedOpportunity = opportunity;
        this.showModal = true;
      }
    },
    closeModal() {
      this.showModal = false;
      this.selectedOpportunity = null;
    },
    acceptRequest(requestId) {
      alert(`Request with ID ${requestId} accepted.`);
      // Implement your logic to accept the request
    },
  },
};
</script>

<style scoped>
/* Add additional styles for better presentation */
</style>
