<template>
  <div class="upcoming-volunteer-opportunities p-6 bg-[#F5EFE7] min-h-screen">
    <h1 class="text-2xl font-semibold text-gray-700 mb-4">Upcoming Opportunities</h1>
    <div v-if="opportunities.length === 0" class="text-center text-gray-500">
      No upcoming opportunities at the moment.
    </div>
    <div v-else class="space-y-4">
      <div
        v-for="opportunity in opportunities"
        :key="opportunity.id"
        class="p-4 bg-white shadow rounded-lg flex justify-between items-center"
      >
        <div>
          <h2 class="text-lg font-semibold">{{ opportunity.title }}</h2>
          <p class="text-sm text-gray-600">{{ opportunity.date }}</p>
          <p class="text-sm text-gray-600">{{ opportunity.location }}</p>
        </div>
        <div>
          <span
            class="px-3 py-1 rounded-full text-white text-sm"
            :class="{
              'bg-green-500': opportunity.status === 'Confirmed',
              'bg-yellow-500': opportunity.status === 'Pending'
            }"
          >
            {{ opportunity.status }}
          </span>
        </div>
        <div>
          <button
            class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            View Details
          </button>
          <button
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition ml-2"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpcomingVolunteerOpportunities",
  data() {
    return {
      opportunities: [
        {
          id: 1,
          title: "Community Park Cleanup",
          date: "2025-01-10",
          location: "Central Park, NYC",
          status: "Confirmed",
        },
        {
          id: 2,
          title: "Food Bank Volunteer",
          date: "2025-01-15",
          location: "Downtown Food Bank",
          status: "Pending",
        },
      ],
    };
  },
};
</script>

<style scoped>
.upcoming-volunteer-opportunities h1 {
  margin-bottom: 1rem;
}
</style>
