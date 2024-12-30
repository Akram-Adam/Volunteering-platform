<template>
  <div class="about-us bg-gradient-to-r from-blue-100 to-blue-50 py-12 px-4">
    <!-- Introduction Section -->
    <div class="text-center mb-12">
      <h1 class="text-5xl font-bold text-gray-800 mb-4 transition-transform duration-500 hover:scale-105">
        Welcome to Our Platform
      </h1>
      <p class="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
        We connect volunteers with opportunities to make a difference. Together, we create a positive impact in our communities.
      </p>
    </div>

    <!-- Our Values Section -->
    <div class="max-w-6xl mx-auto mb-12">
      <h2 class="text-3xl font-semibold text-gray-800 mb-6 text-center transition-opacity duration-700 hover:opacity-80">
        Our Values
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Value Card 1 -->
        <div class="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Compassion</h3>
          <p class="text-gray-600">
            We believe in the power of kindness and empathy to bring about change.
          </p>
        </div>
        <!-- Value Card 2 -->
        <div class="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Collaboration</h3>
          <p class="text-gray-600">
            Working together, we can achieve more and support those in need.
          </p>
        </div>
        <!-- Value Card 3 -->
        <div class="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Integrity</h3>
          <p class="text-gray-600">
            Honesty and transparency guide every step we take.
          </p>
        </div>
      </div>
    </div>

    <!-- Our Story Section -->
    <div class="max-w-4xl mx-auto mb-12">
      <h2 class="text-3xl font-semibold text-gray-800 mb-4 text-center transition-opacity duration-700 hover:opacity-80">
        Our Story
      </h2>
      <p class="text-gray-700 leading-relaxed text-justify">
        Established in 2024, our platform began as a vision to connect individuals willing to give their time and skills to those who need them the most. Over time, we’ve grown into a thriving community where kindness and generosity create a ripple effect of positive change.
      </p>
    </div>

    <!-- Call-to-Action Section -->
    <div class="text-center">
      <button
        class="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:shadow-lg transform transition-transform duration-300 hover:scale-105"
        @click="navigateToLogin"
      >
        Join Us Today
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  methods: {
    navigateToLogin() {
      this.$router.push('/login'); // Redirects the user to the login page
    },
  },
};
</script>

<style scoped>
.about-us {
  font-family: 'Arial', sans-serif;
}

.about-us h1,
.about-us h2 {
  transition: all 0.3s ease-in-out;
}
</style>
