<template>
  <!-- Header Section -->
  <MainHeader />
  <div class="how-it-works bg-gray-50 min-h-screen flex flex-col items-center py-16 px-4">
    <h1 class="text-4xl font-extrabold text-[#3E5879] mb-10">
      Discover How the Platform Works
    </h1>
    <p class="text-lg text-gray-600 max-w-2xl text-center mb-12">
      Whether you are a volunteer looking to make a difference or a requester in need of assistance, our platform connects you to the right opportunities and people.
    </p>

    <!-- Steps Section -->
    <div class="steps grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
      <!-- Volunteer Steps -->
      <div class="bg-white rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-bold text-blue-600 mb-6">For Volunteers</h2>
        <ul class="space-y-4 text-gray-700">
          <li class="flex items-start">
            <span class="inline-block w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">1</span>
            Sign up and create your profile .
          </li>
          <li class="flex items-start">
            <span class="inline-block w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">2</span>
            Post opportunities that match your interests and skills.
          </li>
          <li class="flex items-start">
            <span class="inline-block w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">3</span>
            Accept Requested opportunities and get connected with requesters.
          </li>
        </ul>
      </div>

      <!-- Requester Steps -->
      <div class="bg-white rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-bold text-green-600 mb-6">For Requesters</h2>
        <ul class="space-y-4 text-gray-700">
          <li class="flex items-start">
            <span class="inline-block w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-4">1</span>
            Sign up and create your profile as a requester.
          </li>
          <li class="flex items-start">
            <span class="inline-block w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-4">2</span>
            Post a request for help or browse available volunteers.
          </li>
          <li class="flex items-start">
            <span class="inline-block w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-4">3</span>
            Connect with volunteers and get the help you need.
          </li>
        </ul>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="buttons mt-16 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
      <button
        @click="selectRole('volunteer')"
        class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg shadow-lg text-lg"
      >
        I'm a Volunteer
      </button>
      <button
        @click="selectRole('requester')"
        class="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg shadow-lg text-lg"
      >
        I Need Help
      </button>
    </div>
    <ToastContainer />
  </div>
</template>

<script>
import MainHeader from '@/components/GeneralComponents/MainHeader.vue'; // Import the header
import axios from 'axios'; // Import Axios
import { toast } from 'vue3-toastify'; // Import toast

export default {
  name: "HowItWorks",
  components: {
    MainHeader,
  },
  data() {
    return {
      userRole: null, // Stores the selected role locally
    };
  },
  methods: {
    selectRole(role) {
      this.userRole = role;
      localStorage.setItem("userRole", role);

      // save a success notification in localStorage
      localStorage.setItem(
        "notificationMessage",
        `You have selected: ${role === "volunteer" ? "Volunteer" : "Requester"}`
      );

        // Redirect based on the selected role
      if (role === "volunteer") {
        this.$router.push("/volunteer-dashboard");
      } else if (role === "requester") {
        this.$router.push("/requester-dashboard");
      }
    },
  },
  async created() {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        toast.error("Authentication failed. Redirecting to login.");
        this.$router.push("/login");
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      toast.error("Authentication error occurred. Redirecting to login.");
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
/* Custom Styling for Step Circles */
.steps ul li span {
  font-weight: bold;
  font-size: 14px;
}
</style>
