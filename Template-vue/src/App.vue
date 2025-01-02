<template>
  <div class="min-h-screen flex flex-col">
    <!-- Include the Header component -->
    <PageHeader />
    <main class="flex-1">
    <RouterView />
    </main>main>
    <PageFooter />
  </div>
</template>

<script>
import PageHeader from './components/PageHeader.vue'; // Import the Header component
import PageFooter from './components/PageFooter.vue';


export default {
  name: 'App',
  components: {
    PageHeader, // Register the Header component
    PageFooter, // Register the Footer component
  }
};
</script>

<style scoped>
/* Global styles can be added here if needed */
</style>
