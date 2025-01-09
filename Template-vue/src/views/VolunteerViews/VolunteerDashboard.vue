<template>
  <MainHeader />
  <div class="volunteer-dashboard min-h-screen flex bg-gray-100">
    <!-- Sidebar -->
    <div class="w-64 bg-[#3E5879] text-white p-6">
      <div class="mb-6">
        <h2 class="text-2xl font-bold">Volunteer Dashboard</h2>
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
            to="/posted-opportunities"
            class="block py-2 flex items-center space-x-2 hover:bg-[#4A6C93] px-4 rounded transition"
            active-class="bg-[#4A6C93]"
          >
            <span class="material-icons">history</span>
            <span>My posts</span>
          </router-link>
        </li>
        <li>
          <button
            @click="toggleChat"
            class="block py-2 flex items-center space-x-2 hover:bg-[#4A6C93] px-4 rounded transition w-full text-left"
          >
            <span class="material-icons">message</span>
            <span>Messages</span>
          </button>
        </li>
        <li>
          <router-link
            to="/volunteer-profile"
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
        <h1 class="text-2xl font-semibold text-gray-700">
          Welcome, {{ user.name }}
        </h1>
        <div class="flex items-center space-x-4">
          <button class="material-icons text-gray-500 hover:text-gray-700 transition">
            notifications
          </button>
          <div class="relative group">
            <img
              :src="user.photo || defaultPhoto"
              alt="Profile"
              class="w-10 h-10 rounded-full cursor-pointer"
            />
            <div
              class="absolute right-0 mt-2 bg-white border rounded shadow-md hidden group-hover:block"
            >
              <button
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                @click="goToSettings"
              >
                Settings
              </button>
              <button
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                @click="logout"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="p-6 bg-[white]">
        <RouterView />
      </div>

      <!-- Message Component -->
      <MessageComponent
        v-if="showChat"
        chatTitle="Chat with Requester"
        :initialMessages="chatMessages"
        @closeChat="toggleChat"
        @messageSent="handleMessageSent"
      />
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/GeneralComponents/MainHeader.vue';
import MessageComponent from "@/components/GeneralComponents/MessageComponent.vue";
import { useUserStore } from '@/stores/userStore'; // Import the store
export default {
  name: "VolunteerDashboard",
  components: {
    MessageComponent,
    MainHeader,
  },
  data() {
    return {
      defaultPhoto: "https://via.placeholder.com/40",
      showChat: false,
      chatMessages: [
        { text: "Hello, how can I help you?", sender: "volunteer" },
        { text: "I need help with an upcoming event.", sender: "requester" },
      ],
    };
  },
  computed: {
    user() {
      const userStore = useUserStore();
      return userStore. user; // Get user data from Pinia store
    },
    isLoading() {
      const userStore = useUserStore();
      return userStore.isLoading; //To check the download status
    },
  },
  created() {
    const userStore = useUserStore();
    userStore.fetchUserData(); // Fetch user data from API when component is loaded
  },
  methods: {
    toggleChat() {
      this.showChat = !this.showChat;
    },
    handleMessageSent(message) {
      console.log("Message sent:", message);
    },
    goToSettings() {
      this.$router.push("/settings");
    },
    logout() {
      const userStore = useUserStore();
      userStore.logout(); // Check out through Pinia store
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.router-link-active {
  background-color: #4a6c93 !important;
}

.material-icons {
  font-size: 20px;
}
</style>
