<template>
  <div class="bg-gradient-to-r from-blue-400 to-indigo-600 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>
      <p class="text-center text-gray-600 mb-8">
        Have questions or feedback? We'd love to hear from you!
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Name -->
        <div class="relative">
          <label for="name" class="block text-sm font-medium text-gray-700">Your Name</label>
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i class="fas fa-user text-gray-400"></i>
          </span>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="mt-1 p-3 pl-10 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your name"
            required
          />
        </div>

        <!-- Email -->
        <div class="relative">
          <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i class="fas fa-envelope text-gray-400"></i>
          </span>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="mt-1 p-3 pl-10 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Message -->
        <div class="relative">
          <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            rows="4"
            class="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Type your message here"
            required
          ></textarea>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="w-full bg-[#3E5879] text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactUs",
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      // Handle form submission
      alert("Your message has been sent!");
      this.form.name = "";
      this.form.email = "";
      this.form.message = "";
    },
  },
};
</script>

<style scoped>
.bg-gradient-to-r {
  background: linear-gradient(to right, #2e5487, #e2ebf0);
}
</style>
