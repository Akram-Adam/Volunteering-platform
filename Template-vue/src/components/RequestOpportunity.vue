<template>
  <div class="request-opportunity bg-gray-100 min-h-screen p-6">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Request Volunteer Opportunities</h1>

      <!-- Opportunity List -->
      <div class="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Available Opportunities</h2>
        <div v-for="opportunity in opportunities" :key="opportunity.id" class="border-b border-gray-200 pb-4 mb-4">
          <div class="flex justify-between items-center">
            <!-- Opportunity Details -->
            <div>
              <h3 class="text-xl font-bold text-gray-800">{{ opportunity.title }}</h3>
              <p class="text-sm text-gray-600">{{ opportunity.description }}</p>
              <div class="text-sm text-gray-500 mt-2">
                <span>Available Slots: {{ opportunity.availableSlots }}</span> |
                <span>Total Slots: {{ opportunity.totalSlots }}</span>
              </div>
            </div>
            <!-- Request Button (Disabled if no available slots) -->
            <div>
              <button
                @click="openRequestForm(opportunity)"
                :disabled="opportunity.availableSlots === 0"
                class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                :class="{'bg-gray-300 cursor-not-allowed': opportunity.availableSlots === 0}"
              >
                Request Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Request Form Modal -->
      <div
        v-if="showRequestForm"
        class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
      >
        <div class="bg-white rounded-lg p-6 w-96">
          <h2 class="text-2xl font-semibold text-gray-700 mb-4">Request Opportunity</h2>
          <form @submit.prevent="submitRequest" class="space-y-4">
            <!-- Requester's Name -->
            <div>
              <label for="requester-name" class="block text-gray-600">Your Name</label>
              <input
                type="text"
                id="requester-name"
                v-model="requestForm.name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <!-- Requester's Contact Info -->
            <div>
              <label for="requester-contact" class="block text-gray-600">Contact Info</label>
              <input
                type="text"
                id="requester-contact"
                v-model="requestForm.contactInfo"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <!-- Opportunity Title -->
            <div>
              <label for="opportunity-title" class="block text-gray-600">Opportunity Title</label>
              <input
                type="text"
                id="opportunity-title"
                v-model="requestForm.title"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                readonly
              />
            </div>

            <!-- Requester's Message -->
            <div>
              <label for="message" class="block text-gray-600">Your Message</label>
              <textarea
                id="message"
                v-model="requestForm.message"
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter a message for the volunteer"
              ></textarea>
            </div>

            <!-- Dynamic Fields -->
            <div v-for="(field, index) in requestForm.dynamicFields" :key="index" class="space-y-2">
              <div>
                <label :for="'field-' + index" class="block text-gray-600">Additional Field {{ index + 1 }}</label>
                <input
                  :id="'field-' + index"
                  v-model="field.value"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Additional information"
                />
                <button
                  type="button"
                  @click="removeDynamicField(index)"
                  class="text-red-500 text-sm hover:underline mt-2"
                >
                  Remove Field
                </button>
              </div>
            </div>

            <div>
              <button
                type="button"
                @click="addDynamicField"
                class="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Add Field
              </button>
            </div>

            <!-- Submit Button -->
            <div>
              <button
                type="submit"
                class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
              >
                Submit Request
              </button>
            </div>

            <!-- Close Button -->
            <div>
              <button
                type="button"
                @click="closeRequestForm"
                class="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RequestOpportunity",
  data() {
    return {
      opportunities: [
        {
          id: 1,
          title: "Blood Donation",
          description: "Seeking a Some one need B+ blood type.",
          availableSlots: 3,
          totalSlots: 5,
        },
        {
          id: 2,
          title: "Tech Support for Setting Up a PC",
          description: "Provide Assistance to set up a new computer system.",
          availableSlots: 2,
          totalSlots: 4,
        },
        {
          id: 3,
          title: "Tutoring Math for High School Student",
          description: "Provide tutoring for children in algebra.",
          availableSlots: 1,
          totalSlots: 3,
        },
      ],
      showRequestForm: false,
      requestForm: {
        name: "",
        contactInfo: "",
        title: "",
        message: "",
        dynamicFields: [], // To hold dynamic form fields
      },
    };
  },
  methods: {
    openRequestForm(opportunity) {
      this.requestForm.title = opportunity.title;
      this.showRequestForm = true;
    },
    closeRequestForm() {
      this.showRequestForm = false;
      this.requestForm.name = "";
      this.requestForm.contactInfo = "";
      this.requestForm.title = "";
      this.requestForm.message = "";
      this.requestForm.dynamicFields = []; // Reset dynamic fields
    },
    addDynamicField() {
      this.requestForm.dynamicFields.push({ value: "" });
    },
    removeDynamicField(index) {
      this.requestForm.dynamicFields.splice(index, 1);
    },
    submitRequest() {
      if (this.requestForm.message.trim() === "") {
        alert("Please enter a message before submitting.");
        return;
      }

      // Update the available slots for the requested opportunity
      const opportunity = this.opportunities.find(
        (op) => op.title === this.requestForm.title
      );
      if (opportunity && opportunity.availableSlots > 0) {
        opportunity.availableSlots -= 1; // Decrease the available slots
      }

      // Here you can send the request data to your backend for processing
      alert(`Your request for "${this.requestForm.title}" has been submitted!`);

      // After submission, close the form and clear the data
      this.closeRequestForm();
    },
  },
};
</script>

<style scoped>
.request-opportunity {
  font-family: "Arial", sans-serif;
}

h1,
h2 {
  font-family: "Roboto", sans-serif;
}
</style>
