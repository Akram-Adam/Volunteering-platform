<template>
  <div class="landing-page">
    <PageHeader />
<!-- Main Section (Hero Section) -->
     <section class="hero-section bg-[#213555] text-[#F5EFE7] text-center py-20 relative">
      <div class="absolute inset-0 bg-add-image bg-cover opacity-50"></div>
      <div class="container mx-auto relative">
        <h1 class="text-4xl md:text-5xl font-bold mb-6 animate-bounce">Start your community service journey today</h1>
        <p class="text-lg md:text-xl mb-8">
          Our platform connects volunteers with those in need to develop our communities and build a better future.
          Join us and contribute your time and effort to real change.
        </p>
        <button class="bg-[#3E5879] text-white px-6 py-3 rounded-lg hover:bg-[#D8C4B6] transition"
         @click="navigateToSignUp">Join Now</button>
      </div>
    </section>

<!-- Features Section -->
    <section class="features-section py-10 bg-[#F5EFE7]">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8 text-[#213555]">Why is our platform the best choice?</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-[#3E5879] text-[#F5EFE7]  shadow-lg rounded-lg p-6 hover:shadow-2xl transition">
            <h3 class="text-xl font-bold mb-4">Volunteer easily</h3>
            <p>Create your account and choose the tasks that suit you based on your skills and interests.</p>
          </div>
          <div class="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition">
            <h3 class="text-xl font-bold mb-4">Organized requests</h3>
            <p>Look for clear, reliable requests from event organizers and service owners.</p>
          </div>
          <div class="bg-[#3E5879] text-[#F5EFE7]  shadow-lg rounded-lg p-6 hover:shadow-2xl transition">
            <h3 class="text-xl font-bold mb-4">Effective communication</h3>
            <p>A real-time chat system that makes it easier for you to communicate with teams and organizers.</p>
          </div>
          <div class="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition">
            <h3 class="text-xl font-bold mb-4">Perceptible impact</h3>
            <p>Monitor your contributions and evaluate your performance via a dedicated control panel.</p>
          </div>
        </div>
      </div>
    </section>

<!--Certificates Section -->
    <section class="testimonials-section py-10 bg-[#D8C4B6]">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8 text-[#213555]">Inspiring success stories</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <blockquote class="bg-white shadow-md rounded-lg p-6 hover:bg-[#F5EFE7] transition">
            <p class="italic mb-4">
              “Thanks to this platform, I was able to volunteer at many events. It was a great experience
              And useful for everyone.”
            </p>
            <footer class="font-bold">Ahmed Ali</footer>
          </blockquote>
          <blockquote class="bg-white shadow-md rounded-lg p-6 hover:bg-[#F5EFE7] transition">
            <p class="italic mb-4">
              “The ease of use and connectivity between volunteers and organizers made volunteering fun
              "And simple."
            </p>
            <footer class="font-bold">Fatima Abdel Rahman</footer>
          </blockquote>
        </div>
      </div>
    </section>

<!-- Urge to join -->
<section class="call-to-action-section bg-[#213555] text-[#F5EFE7] text-center py-20 relative">
      <div class="absolute inset-0 bg-custom-image bg-cover opacity-20"></div>
      <div class="container mx-auto relative">
        <h2 class="text-4xl font-bold mb-6">Be part of the change</h2>
        <p class="text-lg mb-6">
          Join thousands of volunteers working to create new opportunities and build stronger communities.
        </p>
        <button class="bg-[#D8C4B6] text-[#213555] px-6 py-3 rounded-lg hover:bg-[#F5EFE7] transition" @click="navigateToSignUp">
          Start now
        </button>
      </div>
    </section>

<!-- New section: Registration steps -->
<section class="steps-section py-10 bg-[#213555] text-[#F5EFE7]">
      <div class="container mx-auto text-center">
        <h2 class="text-3xlfont-bold mb-8">How to start?</h2>
        <div class="grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-[#3E5879] p-6 rounded-lg Shadow-md hover:bg-[#D8C4B6] transmission">
            <h3 class="text-xlfont-bold mb-4">1. Create an account</h3>
            <p>Water can be removed from water. Traffic.</p>
          </div>
          <div class="bg-[#3E5879] p-6 rounded-lg shadow-md hover:bg-[#D8C4B6] transition">
            <h3 class="text-xl font-bold mb-4">2. Log in</h3>
            <p>Log in using your details and choose your role as a volunteer or applicant.</p>
          </div>
          <div class="bg-[#3E5879] p-6 rounded-lg shadow-md hover:bg-[#D8C4B6] transition">
            <h3 class="text-xl font-bold mb-4">3. Take a step</h3>
            <p>If you are a volunteer, offer your time and skills. If you are an applicant, add your help request.</p>
          </div>
          <div class="bg-[#3E5879] p-6 rounded-lg shadow-md hover:bg-[#D8C4B6] transition">
            <h3 class="text-xl font-bold mb-4">4. Contact</h3>
            <p>Communicate with the team or individuals to achieve the desired impact.</p>
          </div>
        </div>
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
    const revealed = ref(false);

    onMounted(() => {
      setTimeout(() => {
        revealed.value = true;
      }, 300);
    });

    const navigateToSignUp = () => {
      router.push('/signup'); // Correct way to navigate
    };

    return { revealed, navigateToSignUp };
  },
};
</script>

<style scoped>
.landing-page {
  font-family: 'Arial', sans-serif;
}
</style>
