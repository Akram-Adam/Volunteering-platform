<template>
  <!-- include the header -->
  <PageHeader />
  <div class="bg-gradient-to-r from-[#2e5487] to-[#6b8ecd] min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl w-full bg-white p-10 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105">
      <h2 class="text-4xl font-extrabold text-center text-gray-800 mb-6 animate-fade-in">Contact Us</h2>
      <p class="text-center text-gray-600 mb-8 animate-slide-down">
        Have questions or feedback? We'd love to hear from you!
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Name of the sender-->
        <div class="relative animate-slide-left">
          <label for="name" class="block text-sm font-medium text-gray-700">Your Name</label>
          <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <i class="fas fa-user text-gray-400"></i>
          </span>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="mt-1 p-4 pl-10 block w-full border border-gray-300 rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your name"
            required
          />
        </div>

        <!-- Email of the sender -->
        <div class="relative animate-slide-right">
          <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
          <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <i class="fas fa-envelope text-gray-400"></i>
          </span>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="mt-1 p-4 pl-10 block w-full border border-gray-300 rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Message -->
        <div class="relative animate-slide-up">
          <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            rows="4"
            class="mt-1 p-4 block w-full border border-gray-300 rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Type your message here"
            required
          ></textarea>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="w-full bg-[#2e5487] text-white py-3 px-6 rounded-md hover:bg-gray-400 transition-all duration-300 transform hover:scale-105 animate-fade-in"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/GeneralComponents/PageHeader.vue';

export default {
  name: "ContactUs",
  components: {
    PageHeader,
  },
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
      alert("Your message has been sent!");
      this.form.name = "";
      this.form.email = "";
      this.form.message = "";
    },
  },
};
</script>

<style scoped>
/* Background gradient */
.bg-gradient-to-r {
  background: linear-gradient(to right, #2e5487, #6b8ecd);
}

/* Animations */
.animate-fade-in {
  animation: fade-in 1.5s ease-in-out;
}

.animate-slide-down {
  animation: slide-down 1.5s ease-in-out;
}

.animate-slide-left {
  animation: slide-left 1.5s ease-in-out;
}

.animate-slide-right {
  animation: slide-right 1.5s ease-in-out;
}

.animate-slide-up {
  animation: slide-up 1.5s ease-in-out;
}

/* Keyframes */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-down {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-left {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-right {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
