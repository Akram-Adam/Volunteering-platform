<template>
  <div class="volunteer-overview p-6 bg-gray-100 min-h-screen">
   <!-- Display opportunity statistics -->
    <div v-if="isLoading" class="text-center">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 shadow rounded-lg">
          <h3 class="text-lg font-semibold mb-2">Total opportunities</h3>
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

      <div class="bg-white p-6 shadow rounded-lg">
        <h3 class="text-xl font-semibold mb-4">Modern opportunities</h3>
        <table class="w-full border-collapse">
          <thead class="bg-gray-200">
            <tr>
              <th class="border px-4 py-2 text-left">Opportunity Name</th>
              <th class="border px-4 py-2 text-left">Student name</th>
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
                  @click="markAsCompleted(opportunity.id)"
                  class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Mark as complete
                </button>
                <span v-else class="text-gray-500">Completed</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { useVolunteerStore } from "@/stores/volunteer/volunteerOverviewStore";


export default {
  setup() {
    const store = useVolunteerStore();

    // Fetch data on mount
    store.fetchOpportunities();

    return {
      ...store,
    };
  },
};
</script>

<style scoped>
th,
td {
  text-align: left;
}
</style>
