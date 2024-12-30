<template>
  <div class="sidebar w-64 bg-[#3E5879] text-white p-6 h-screen">
    <h2 class="text-2xl font-bold mb-6">Dashboard</h2>
    <ul>
      <li class="mb-4 flex items-center">
        <font-awesome-icon icon="gauge" class="mr-2" />
        <router-link to="/volunteer-dashboard" class="block py-2">Overview</router-link>
      </li>
      <li class="mb-4 flex items-center">
        <font-awesome-icon icon="calendar" class="mr-2" />
        <router-link to="/volunteer-dashboard/upcoming" class="block py-2">Upcoming Opportunities</router-link>
      </li>
      <li class="mb-4 flex items-center">
        <font-awesome-icon icon="envelope" class="mr-2" />
        <router-link to="/volunteer-dashboard/messages" class="block py-2">Messages</router-link>
      </li>
      <li class="mb-4 flex items-center">
        <font-awesome-icon icon="user" class="mr-2" />
        <router-link to="/volunteer-dashboard/profile" class="block py-2">Profile</router-link>
      </li>
      <li class="mb-4 flex items-center">
        <font-awesome-icon icon="plus" class="mr-2" />
        <router-link to="/post-opportunity" class="block py-2">Post Opportunity</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SideBar",
};
</script>

<style scoped>
.sidebar {
  font-family: Arial, sans-serif;
}
</style>
