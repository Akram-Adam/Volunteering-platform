<template>
    <!-- This is the main header for all pages -->
  <header class="bg-[#e5e5e5] p-4">
    <!-- Logo Section -->
    <div class="flex items-center justify-between">
      <RouterLink to="/" class="text-2xl font-bold text-[#3E5879]">Volunteering Platform</RouterLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex space-x-6">
        <RouterLink to="/main-page" class="text-lg font-semibold hover:text-[#4C6EF5] text-[#3E5879]">Change Role</RouterLink>
        <RouterLink to="/login" class="text-lg font-semibold hover:text-[#D8C4B6] text-[#3E5879]">Log Out</RouterLink>
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
      <RouterLink to="/main-page" class="block text-lg font-semibold py-2">Change Role</RouterLink>
      <RouterLink to="/login" class="block text-lg font-semibold py-2">Log Out</RouterLink>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
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
