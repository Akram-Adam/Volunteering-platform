<template>
  <div class="post-opportunity-page p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-center">Post a Volunteer Opportunity</h1>
    <form @submit.prevent="submitOpportunity">
      <!-- Title -->
      <div class="mb-4">
        <label for="title" class="block font-semibold mb-2">Title</label>
        <input
          id="title"
          v-model="opportunity.title"
          type="text"
          class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter the opportunity title"
          required
        />
      </div>

      <!-- Description -->
      <div class="mb-4">
        <label for="description" class="block font-semibold mb-2">Description</label>
        <textarea
          id="description"
          v-model="opportunity.description"
          rows="4"
          class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Describe the opportunity in detail"
          required
        ></textarea>
      </div>

      <!-- Category -->
      <div class="mb-4">
        <label for="category" class="block font-semibold mb-2">Category</label>
        <select
          id="category"
          v-model="opportunity.category"
          class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="" disabled>Select a category</option>
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Event Assistance">Event Assistance</option>
          <option value="Tech Support">Tech Support</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <!-- Availability -->
      <div class="mb-4">
        <label for="availability" class="block font-semibold mb-2">Availability</label>
        <input
          id="availability"
          v-model="opportunity.availability"
          type="text"
          class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="e.g., Monday to Friday, 9 AM to 5 PM"
          required
        />
      </div>

      <!-- Location -->
      <div class="mb-4">
        <label for="location" class="block font-semibold mb-2">Location</label>
        <input
          id="location"
          v-model="opportunity.location"
          type="text"
          class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter the location"
          required
        />
      </div>

      <!-- Dynamic Fields -->
      <div>
          <h2 class="text-sm font-medium text-gray-700 mb-2">
            Add Additional Fields
          </h2>
          <div class="space-y-2">
            <div
              v-for="(field, index) in customFields"
              :key="index"
              class="flex items-center space-x-2"
            >
              <input
                v-model="field.value"
                type="text"
                class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                :placeholder="field.name || 'Custom Field'"
              />
              <button
                type="button"
                @click="removeField(index)"
                class="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
          <button
            type="button"
            @click="addField"
            class="mt-2 text-blue-500 hover:text-blue-600 text-sm"
          >
            + Add Field
          </button>
        </div>

      <!-- Submit Button -->
<div class="flex justify-center mt-4">
  <button
    type="submit"
    class="bg-[#213555] text-white px-6 py-2 rounded hover:bg-blue-600"
  >
    Submit Opportunity
  </button>
</div>
    </form>
  </div>
</template>

<script>
export default {
  name: "PostOpportunity",
  data() {
    return {
      opportunity: {
        title: "",
        description: "",
        category: "",
        availability: "",
        location: "",
      },
      dynamicFields: [],
    };
  },
  methods: {
    addField() {
      this.dynamicFields.push({
        placeholder: "Enter additional information",
        value: "",
      });
    },
    removeField(index) {
      this.dynamicFields.splice(index, 1);
    },
    submitOpportunity() {
      const completeOpportunity = {
        ...this.opportunity,
        additionalFields: this.dynamicFields.map((field) => field.value),
      };
      console.log("Opportunity Submitted:", completeOpportunity);
      alert("Volunteer Opportunity Submitted!");
      this.$router.push("/"); // Navigate after submission
    },
  },
};
</script>

<style scoped>
.post-opportunity-page {
  font-family: Arial, sans-serif;
}
</style>
