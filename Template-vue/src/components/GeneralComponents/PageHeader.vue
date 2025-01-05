<template>
      <!-- This is the Landing Page header -->
  <header class="bg-[#e5e5e5] p-4">
    <!-- Logo Section -->
    <div class="flex items-center justify-between">
      <RouterLink to="/" class="text-2xl font-bold text-[#3E5879]">Volunteering Platform</RouterLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex space-x-6">
        <RouterLink to="/" class="text-lg font-semibold hover:text-[#4C6EF5] text-[#3E5879]">Home</RouterLink>
        <RouterLink to="/contact-us" class="text-lg font-semibold hover:text-[#D8C4B6] text-[#3E5879]">Contact</RouterLink>
        <RouterLink to="/about-us" class="text-lg font-semibold hover:text-[#D8C4B6] text-[#3E5879]">About</RouterLink>
        <RouterLink to="/login" class="text-lg font-semibold hover:text-[#D8C4B6] text-[#3E5879]">Log In</RouterLink>
      </nav>

      <!-- Mobile Hamburger Menu -->
      <div class="md:hidden">
        <button @click="toggleMenu" class="text-2xl">
          ☰
        </button>
      </div>
    </div>

    <!-- Mobile Navigation (Dropdown Menu) -->
    <div v-if="isMenuOpen" class="md:hidden mt-4">
      <RouterLink to="/" class="block text-lg font-semibold py-2">Home</RouterLink>
      <RouterLink to="/about" class="block text-lg font-semibold py-2">About</RouterLink>
      <RouterLink to="/find-opportunities" class="block text-lg font-semibold py-2">Find Opportunities</RouterLink>
      <RouterLink to="/how-it-works" class="block text-lg font-semibold py-2">How It Works</RouterLink>
      <RouterLink to="/signup" class="block text-lg font-semibold py-2">Sign Up</RouterLink>
      <RouterLink to="/login" class="block text-lg font-semibold py-2">Log In</RouterLink>
      <RouterLink to="/contact" class="block text-lg font-semibold py-2">Contact</RouterLink>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
</script>

<style scoped>
header {
  font-family: 'Arial', sans-serif;
}

nav a:hover {
  color: #D8C4B6; /* Light gold hover effect */
}

.md\:hidden {
  display: none;
}

@media (max-width: 768px) {
  .md\:hidden {
    display: block;
  }

  nav {
    display: none;
  }
}
</style>
