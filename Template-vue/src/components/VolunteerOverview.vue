<template>
  <div class="volunteer-overview p-6 bg-gray-100 min-h-screen">
    <h2 class="text-2xl font-bold mb-6">Welcome, {{ volunteerName }}</h2>

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
            <th class="border px-4 py-2 text-left">Name</th>
            <th class="border px-4 py-2 text-left">Date</th>
            <th class="border px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="opportunity in recentOpportunities" :key="opportunity.id">
            <td class="border px-4 py-2">{{ opportunity.name }}</td>
            <td class="border px-4 py-2">{{ opportunity.date }}</td>
            <td class="border px-4 py-2">
              <span :class="{
                'text-green-500': opportunity.status === 'Completed',
                'text-yellow-500': opportunity.status === 'Ongoing',
              }">
                {{ opportunity.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "VolunteerOverview",
  data() {
    return {
      volunteerName: "Akram Adam", // Replace with dynamic data if needed
      stats: {
        totalOpportunities: 15,
        completed: 10,
        ongoing: 5,
      },
      recentOpportunities: [
        { id: 1, name: "Community Cleanup", date: "2025-01-10", status: "Completed" },
        { id: 2, name: "Tree Planting", date: "2025-01-15", status: "Ongoing" },
        { id: 3, name: "Food Drive", date: "2025-01-20", status: "Ongoing" },
      ],
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
