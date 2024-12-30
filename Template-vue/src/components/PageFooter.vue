<template>
  <footer class="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-6">
    <div class="container mx-auto text-center">
      <p>&copy; 2024 Volunteering Platform. All rights reserved.</p>
      <div class="mt-4 space-x-4">
        <a href="/terms" class="text-gray-300 hover:text-white">Terms of Service</a>
        <a href="/privacy" class="text-gray-300 hover:text-white">Privacy Policy</a>
        <a href="/contact" class="text-gray-300 hover:text-white">Contact Us</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "PageFooter",
};
</script>

<style scoped>
footer {
  font-size: 0.9rem;
}
</style>
