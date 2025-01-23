<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-1">
    <RouterView />
    </main>
    <ToastContainer />
    <!-- Include the footer component -->
    <PageFooter />
  </div>
</template>

<script>
import PageFooter from './components/PageFooter.vue';


export default {
  name: 'App',
  components: {
    PageFooter, // Register the Footer component
  }
};
</script>

<style scoped>
/* Global styles can be added here if needed */
</style>
