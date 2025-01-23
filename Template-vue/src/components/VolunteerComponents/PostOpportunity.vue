<template>
  <div class="post-opportunity-page p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Post a Volunteer Opportunity</h1>
    <form @submit.prevent="submitOpportunity">
      <div v-if="error" class="mb-4 text-red-600 font-semibold">
        {{ error }}
      </div>
      <div class="mb-4">
        <label for="title" class="block font-semibold mb-2">Title</label>
        <input
          id="title"
          v-model="opportunity.title"
          type="text"
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label for="description" class="block font-semibold mb-2">Description</label>
        <textarea
          id="description"
          v-model="opportunity.description"
          rows="4"
          class="w-full p-2 border rounded"
          required
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="category" class="block font-semibold mb-2">Category</label>
        <select v-model="opportunity.category" class="w-full p-2 border rounded" required>
          <option value="">Select a category</option>
          <option value="education">Education</option>
          <option value="environment">Environment</option>
          <option value="health">Health</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="availability" class="block font-semibold mb-2">Availability</label>
        <input
          id="availability"
          v-model="opportunity.availability"
          type="date"
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label for="location" class="block font-semibold mb-2">Location</label>
        <select v-model="opportunity.location" class="w-full p-2 border rounded" required>
          <option value="">Select a location</option>
            <option value="Algeria">Algeria</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Comoros">Comoros</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Egypt">Egypt</option>
            <option value="Iraq">Iraq</option>
            <option value="Jordan">Jordan</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Libya">Libya</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Morocco">Morocco</option>
            <option value="Oman">Oman</option>
            <option value="Palestine">Palestine</option>
            <option value="Qatar">Qatar</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Somalia">Somalia</option>
            <option value="Sudan">Sudan</option>
            <option value="Syria">Syria</option>
            <option value="Tunisia">Tunisia</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="Yemen">Yemen</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="maxRequesters" class="block font-semibold mb-2">Maximum Number of Requesters</label>
        <input
          id="maxRequesters"
          v-model.number="opportunity.maxRequesters"
          type="number"
          class="w-full p-2 border rounded"
          min="1"
          required
        />
      </div>
      <button
        type="submit"
        :disabled="loading"
        class="bg-[#3E5879] text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {{ loading ? "Submitting..." : "Submit" }}
      </button>
    </form>
  </div>
</template>

<script>
import { useOpportunityStore } from "@/stores/volunteer/opportunityStore.js";
import { reactive } from "vue";
import { toast } from "vue3-toastify"; // Import the toast function for notifications
import "vue3-toastify/dist/index.css"; // Import the library's styles

export default {
  name: "PostOpportunity",
  setup() {
    // Access the store for managing volunteer opportunities
    const opportunityStore = useOpportunityStore();

    // Define the reactive object for the opportunity form data
    const opportunity = reactive({
      title: "",
      description: "",
      category: "",
      availability: "",
      location: "",
      maxRequesters: 1,
    });

    // Function to handle the submission of the volunteer opportunity
    const submitOpportunity = async () => {
      try {
        // Call the store method to add the opportunity
        await opportunityStore.addOpportunity(opportunity);

        // Display a success notification
        toast.success("Volunteer opportunity added!", {
          position: "top-right", // Position of the toast on the screen
          autoClose: 3000, // Automatically close after 3 seconds
          hideProgressBar: false, // Show the progress bar
          closeOnClick: true, // Close the toast when clicked
          pauseOnHover: true, // Pause the timer when hovering over the toast
          draggable: true, // Allow the toast to be dragged
        });

        // Redirect to another page after a short delay (to allow time to read the toast)
        setTimeout(() => {
          window.location.href = "/volunteer-dashboard";
        }, 3000); // 3 seconds delay
      } catch (error) {
        // Display an error notification if the submission fails
        toast.error("Failed to add opportunity. Please try again.", {
          position: "top-right",
          autoClose: 5000, // Automatically close after 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Log the error for debugging purposes
        console.error("Submission failed:", error);
      }
    };

    // Return the reactive data and methods to the template
    return {
      opportunity,
      submitOpportunity,
      loading: opportunityStore.loading, // Loading state from the store
      error: opportunityStore.error, // Error state from the store
    };
  },
};
</script>



<style scoped>
.post-opportunity-page {
  font-family: Arial, sans-serif;
}
</style>
