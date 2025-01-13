<template>
  <div class="my-posted-requests bg-gray-100 min-h-screen p-6">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Posted Requests
      </h1>

      <!-- Search Section -->
      <div class="flex flex-wrap justify-between mb-6">
        <div class="mb-4 w-full md:w-1/2 pr-4">
          <label for="search-title" class="block text-gray-700 font-medium mb-2">
            Search by Title
          </label>
          <input
            v-model="searchTitle"
            id="search-title"
            type="text"
            class="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter request title"
          />
        </div>
        <div class="mb-4 w-full md:w-1/2">
          <label for="search-date" class="block text-gray-700 font-medium mb-2">
            Search by Date
          </label>
          <input
            v-model="searchDate"
            id="search-date"
            type="date"
            class="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <!-- Requests Table -->
      <div class="overflow-x-auto bg-white shadow-md rounded-lg">
        <table class="min-w-full text-left">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-6 py-4 text-gray-700 font-bold">Request Title</th>
              <th class="px-6 py-4 text-gray-700 font-bold">Request Date</th>
              <th class="px-6 py-4 text-gray-700 font-bold">Status</th>
              <th class="px-6 py-4 text-gray-700 font-bold">Volunteer Details</th>
              <th class="px-6 py-4 text-gray-700 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="request in filteredRequests"
              :key="request.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="px-6 py-4">{{ request.title }}</td>
              <td class="px-6 py-4">{{ request.date }}</td>
              <td class="px-6 py-4">
                <span
                  :class="statusClass(request.status)"
                  class="text-xs font-semibold px-2 py-1 rounded inline-block"
                >
                  {{ request.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div
                  v-if="['Accepted', 'Completed'].includes(request.status)"
                  class="text-sm"
                >
                  <p class="font-semibold">Name: {{ request.volunteer.name }}</p>
                  <p>Email: {{ request.volunteer.email }}</p>
                  <p>Phone: {{ request.volunteer.phone }}</p>
                </div>
                <div v-else class="text-gray-500 italic">Not Applicable</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex space-x-2">
                  <button
                    @click="viewRequestDetails(request)"
                    class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    View Details
                  </button>
                  <button
                    v-if="request.status === 'Pending'"
                    @click="cancelRequest(request.id)"
                    class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Request Details Modal -->
      <div
        v-if="selectedRequest"
        class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white p-6 rounded-lg w-3/4 md:w-1/2">
          <h2 class="text-2xl font-bold mb-4">Request Details</h2>
          <p><strong>Request Title:</strong> {{ selectedRequest.title }}</p>
          <p><strong>Request Date:</strong> {{ selectedRequest.date }}</p>

          <!-- Volunteer Details -->
          <div v-if="['Accepted', 'Completed'].includes(selectedRequest.status)">
            <p><strong>Volunteer Name:</strong> {{ selectedRequest.volunteer.name }}</p>
            <p><strong>Email:</strong> {{ selectedRequest.volunteer.email }}</p>
            <p><strong>Phone:</strong> {{ selectedRequest.volunteer.phone }}</p>
          </div>
          <div v-else>
            <p class="text-gray-500 italic">Volunteer details are not available.</p>
          </div>

          <!-- Message to Volunteer -->
          <div class="mt-4">
            <label for="message" class="block text-gray-700">Write a message to the volunteer:</label>
            <textarea
              v-model="message"
              id="message"
              rows="4"
              class="w-full mt-2 p-2 border rounded-lg"
              placeholder="Write your message here"
            ></textarea>
          </div>

          <div class="mt-4 flex justify-between">
            <button
              @click="closeModal"
              class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
            <button
              @click="sendMessage"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRequestStore } from "@/stores/requester/requestStore";

export default {
  name: "MyPostedRequests",
  data() {
    return {
      searchTitle: "",
      searchDate: "",
      selectedRequest: null, // Holds the selected request for details
      message: "", // Holds the message content
    };
  },
  computed: {
    filteredRequests() {
      return this.requestStore.filteredRequests(
        this.searchTitle,
        this.searchDate
      );
    },
  },
  methods: {
    viewRequestDetails(request) {
      this.selectedRequest = request; // Set the selected request to show details
      this.message = ""; // Reset the message
    },
    closeModal() {
      this.selectedRequest = null; // Close the modal by resetting the selected request
    },
    sendMessage() {
      if (this.message.trim() !== "") {
        alert(`Message sent to ${this.selectedRequest.volunteer.name}: ${this.message}`);
        this.message = ""; // Reset the message
        this.selectedRequest = null; // Close the modal
      } else {
        alert("Please write a message before sending.");
      }
    },
    cancelRequest(id) {
      if (confirm("Are you sure you want to cancel this request?")) {
        this.requestStore.requests = this.requestStore.requests.filter((req) => req.id !== id);
        alert("Request canceled successfully.");
      }
    },
    statusClass(status) {
      switch (status) {
        case "Accepted":
          return "bg-blue-100 text-blue-700";
        case "Completed":
          return "bg-gray-200 text-gray-700";
        case "Pending":
          return "bg-yellow-100 text-yellow-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    },
  },
  mounted() {
    // Fetch requests when the component is mounted
    this.requestStore.fetchRequests();
  },
  setup() {
    const requestStore = useRequestStore();
    return { requestStore };
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 12px;
  text-align: left;
}

th {
  font-weight: bold;
}

td {
  border-top: 1px solid #e5e7eb;
}

/* Modal Styles */
.fixed {
  z-index: 9999;
}
</style>
