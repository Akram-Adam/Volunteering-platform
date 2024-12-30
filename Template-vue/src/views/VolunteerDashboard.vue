<template>
  <div class="volunteer-dashboard min-h-screen flex bg-gray-100">
    <!-- Sidebar -->
    <div class="w-64 bg-[#3E5879] text-white p-6">
      <div class="mb-6">
        <h2 class="text-2xl font-bold">Volunteer Platform</h2>
      </div>
      <ul class="space-y-4">
        <li>
          <router-link
            to="/volunteer-dashboard"
            class="block py-2 flex items-center space-x-2 hover:bg-[#4A6C93] px-4 rounded transition"
            active-class="bg-[#4A6C93]"
          >
            <span class="material-icons">dashboard</span>
            <span>Overview</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/volunteer-dashboard/upcoming"
            class="block py-2 flex items-center space-x-2 hover:bg-[#4A6C93] px-4 rounded transition"
            active-class="bg-[#4A6C93]"
          >
            <span class="material-icons">event</span>
            <span>Upcoming Opportunities</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/volunteer-dashboard/messages"
            class="block py-2 flex items-center space-x-2 hover:bg-[#4A6C93] px-4 rounded transition"
            active-class="bg-[#4A6C93]"
          >
            <span class="material-icons">message</span>
            <span>Messages</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/volunteer-dashboard/profile"
            class="block py-2 flex items-center space-x-2 hover:bg-[#4A6C93] px-4 rounded transition"
            active-class="bg-[#4A6C93]"
          >
            <span class="material-icons">person</span>
            <span>Profile</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/post-opportunity"
            class="block py-2 flex items-center space-x-2 hover:bg-[#4A6C93] px-4 rounded transition"
            active-class="bg-[#4A6C93]"
          >
            <span class="material-icons">add_circle</span>
            <span>Post Opportunity</span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="flex-1">
      <!-- Header -->
      <header class="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-gray-700">Volunteer Dashboard</h1>
        <div class="flex items-center space-x-4">
          <button class="material-icons text-gray-500 hover:text-gray-700 transition">notifications</button>
          <div class="relative group">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              class="w-10 h-10 rounded-full cursor-pointer"
            />
            <div
              class="absolute right-0 mt-2 bg-white border rounded shadow-md hidden group-hover:block"
            >
              <button class="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">Settings</button>
              <button class="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">Logout</button>
            </div>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="p-6 bg-[#F5EFE7]">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VolunteerDashboard',
};
</script>

<style scoped>
/* Add a transition to the active link background */
.router-link-active {
  background-color: #4A6C93 !important;
}

.material-icons {
  font-size: 20px;
}
</style>
