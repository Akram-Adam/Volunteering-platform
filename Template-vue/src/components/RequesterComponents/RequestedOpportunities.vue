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
                  v-if="['Accepted', 'Completed', 'Active'].includes(request.status)"
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
                    @click="viewRequestDetails(request.id)"
                    class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    View Details
                  </button>
                  <button
                    v-if="request.status === 'Active'"
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
    </div>
  </div>
</template>

<script>
export default {
  name: "MyPostedRequests",
  data() {
    return {
      searchTitle: "", // Holds search term for title
      searchDate: "", // Holds search term for date
      requests: [
        {
          id: 1,
          title: "Gardening Help Needed",
          date: "2025-01-02",
          status: "Accepted",
          volunteer: {
            name: "Alice Johnson",
            email: "alice.j@example.com",
            phone: "123-456-7890",
          },
        },
        {
          id: 2,
          title: "Need Assistance with Moving",
          date: "2025-01-01",
          status: "Active",
          volunteer: {
            name: "David Clark",
            email: "david.c@example.com",
            phone: "456-789-1230",
          },
        },
        {
          id: 3,
          title: "Math Tutoring for My Child",
          date: "2024-12-30",
          status: "Completed",
          volunteer: {
            name: "Bob Smith",
            email: "bob.s@example.com",
            phone: "987-654-3210",
          },
        },
        {
          id: 4,
          title: "Event Decoration",
          date: "2024-12-29",
          status: "Pending",
          volunteer: null,
        },
      ],
    };
  },
  computed: {
    filteredRequests() {
      return this.requests.filter((request) => {
        const matchesTitle = request.title
          .toLowerCase()
          .includes(this.searchTitle.toLowerCase());
        const matchesDate = !this.searchDate || request.date === this.searchDate;
        return matchesTitle && matchesDate;
      });
    },
  },
  methods: {
    viewRequestDetails(id) {
      alert(`Viewing details for request ID: ${id}`);
      // Navigate to request details page or handle logic
    },
    cancelRequest(id) {
      if (confirm("Are you sure you want to cancel this request?")) {
        const requestIndex = this.requests.findIndex((req) => req.id === id);
        if (requestIndex !== -1) {
          this.requests.splice(requestIndex, 1); // Remove the request from the list
          alert("Request canceled successfully.");
        }
      }
    },
    statusClass(status) {
      switch (status) {
        case "Active":
          return "bg-green-100 text-green-700";
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
</style>
