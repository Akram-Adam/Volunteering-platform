<template>
  <div class="volunteer-overview p-6 bg-gray-100 min-h-screen">
    <!-- Statistics Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 shadow rounded-lg">
        <h3 class="text-lg font-semibold mb-2">Total Opportunities</h3>
        <p class="text-4xl font-bold text-indigo-600">{{ stats.totalOpportunities }}</p>
      </div>
      <div class="bg-white p-6 shadow rounded-lg">
        <h3 class="text-lg font-semibold mb-2">Completed</h3>
        <p class="text-4xl font-bold text-green-500">{{ stats.completed }}</p>
      </div>
      <div class="bg-white p-6 shadow rounded-lg">
        <h3 class="text-lg font-semibold mb-2">Ongoing</h3>
        <p class="text-4xl font-bold text-yellow-500">{{ stats.ongoing }}</p>
      </div>
    </div>

    <!-- Recent Opportunities -->
    <div class="bg-white p-6 shadow rounded-lg">
      <h3 class="text-xl font-semibold mb-4">Recent Opportunities</h3>
      <table class="w-full border-collapse">
        <thead class="bg-gray-200">
          <tr>
            <th class="border px-4 py-2 text-left">Opportunity Name</th>
            <th class="border px-4 py-2 text-left">Requester Name</th>
            <th class="border px-4 py-2 text-left">Status</th>
            <th class="border px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="opportunity in recentOpportunities" :key="opportunity.id">
            <td class="border px-4 py-2">{{ opportunity.name }}</td>
            <td class="border px-4 py-2">{{ opportunity.requesterName }}</td>
            <td class="border px-4 py-2">
              <span :class="{
                'text-green-500': opportunity.status === 'Completed',
                'text-yellow-500': opportunity.status === 'Ongoing',
              }">
                {{ opportunity.status }}
              </span>
            </td>
            <td class="border px-4 py-2">
              <button
                v-if="opportunity.status === 'Ongoing'"
                @click="markAsCompleted(opportunity)"
                class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Mark as Completed
              </button>
              <span v-else class="text-gray-500">Completed</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Static data for recent opportunities
      recentOpportunities: [
        { id: 1, name: "Community Cleanup", requesterName: "John Doe", status: "Ongoing" },
        { id: 2, name: "Tree Planting", requesterName: "Jane Smith", status: "Ongoing" },
        { id: 3, name: "Food Drive", requesterName: "Mark Lee", status: "Completed" },
      ],
    };
  },
  computed: {
    stats() {
      const totalOpportunities = this.recentOpportunities.length;
      const completed = this.recentOpportunities.filter(op => op.status === 'Completed').length;
      const ongoing = this.recentOpportunities.filter(op => op.status === 'Ongoing').length;

      return {
        totalOpportunities,
        completed,
        ongoing,
      };
    },
  },
  methods: {
    // Method to mark an opportunity as completed
    markAsCompleted(opportunity) {
      opportunity.status = 'Completed'; // Change status to 'Completed'
    }
  },
};
</script>

<style scoped>
th,
td {
  text-align: left;
}
</style>
