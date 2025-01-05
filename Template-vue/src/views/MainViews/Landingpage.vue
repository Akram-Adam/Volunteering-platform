<template>
  <div class="landing-page">
    <PageHeader />
    <!-- Hero Section -->
    <section class="hero-section bg-[#3E5879] text-[#F5EFE7] text-center py-20">
      <div class="container mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold mb-6 animate-bounce">
          Start your community service journey today
        </h1>
        <p class="text-lg md:text-xl mb-8">
          Our platform connects volunteers with those in need to grow our communities and build a
          better future. Join us and contribute your time and effort to real change.
        </p>
        <button
          class="bg-[#3E5879] text-white px-6 py-3 rounded-lg hover:bg-[#D8C4B6] transition"
          @click="navigateToSignUp"
        >
          Join Now
        </button>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-10 bg-[#e5e5e5]">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8 text-[#213555]">Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-xl font-bold mb-4">Volunteer Easily</h3>
            <p>Create your account and choose the tasks that are right for you based on your skills and interests.</p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-xl font-bold mb-4">Structured Requests</h3>
            <p>Look for clear and reliable requests from event organizers and service owners.</p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-xl font-bold mb-4">Effective Communication</h3>
            <p>An real-time chat system that makes it easy for you to communicate with teams and organizers.</p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-xl font-bold mb-4">Tangible Impact</h3>
            <p>Track your contributions and evaluate your performance through a dedicated dashboard.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="call-to-action-section bg-[#e5e5e5] text-[#F5EFE7] text-center py-10">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold mb-4 text-[green]">Be part of the change</h2>
        <p class="text-lg mb-6 text-[#3E5879]">
          Join thousands of volunteers working to create new opportunities and build stronger
          communities.
        </p>
        <button
          class="bg-[#e11d48] text-[white] px-6 py-3 rounded-3xl hover:bg-[#3E6333] transition"
          @click="navigateToSignUp"
        >
          GET STARTED
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import PageHeader from '@/components/GeneralComponents/PageHeader.vue'; // Import the landing page header
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'LandingPage',
  components: {
    PageHeader, // Register the Footer component
  },
  setup() {
    const router = useRouter();

    const steps = ref([
      { title: 'Step 1: Sign Up', description: 'Register by providing basic user information such as your name, email, and password.' },
      { title: 'Step 2: Login', description: 'Login using your credentials and select your role as a Volunteer or Requester.' },
      { title: 'Step 3: Take Action', description: 'If you\'re a Volunteer, offer your skills and time. If you\'re a Requester, post a request for help.' },
      { title: 'Step 4: Connect', description: 'Facilitate meaningful connections between Volunteers and Requesters to create impact.' },
    ]);

    const revealed = ref(false);

    onMounted(() => {
      setTimeout(() => {
        revealed.value = true;
      }, 300);
    });

    const navigateToSignUp = () => {
      router.push('/signup'); // Correct way to navigate
    };

    return { steps, revealed, navigateToSignUp };
  },
};
</script>

<style scoped>
.landing-page {
  font-family: 'Arial', sans-serif;
}
</style>
