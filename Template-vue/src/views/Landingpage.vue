<template>
  <div class="landing-page">
    <!-- nav bar-->
    <nav class="bg-[#213555] text-white p-4 flex justify-between items-center">
      <div class="text-lg font-bold">Our Volunteer Platform</div>
      <div class="space-x-4">
        <button class="bg-[#3E5879] text-white px-4 py-2 rounded hover:bg-[#D8C4B6] transition">
          Log In
        </button>
        <button class="bg-[#3E5879] text-white px-4 py-2 rounded hover:bg-[#D8C4B6] transition">
          Sign Up
        </button>
      </div>
    </nav>

    <!-- (Hero Section) -->
    <section class="hero-section bg-[#3E5879] text-[#F5EFE7] text-center py-20">
      <div class="container mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold mb-6 animate-bounce">
          Start your community service journey today
        </h1>
        <p class="text-lg md:text-xl mb-8">
          Our platform connects volunteers with those in need to grow our communities and build a
          better future. Join us and contribute your time and effort to real change.
        </p>
        <button class="bg-[#3E5879] text-white px-6 py-3 rounded-lg hover:bg-[#D8C4B6] transition">
          Join Now
        </button>
      </div>
    </section>
    <section class="features-section py-10 bg-[#F5EFE7]">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8 text-[#213555]"></h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-xl font-bold mb-4">Volunteer easilys</h3>
            <p>
              Create your account and choose the tasks that are right for you based on your skills
              and interests.
            </p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-xl font-bold mb-4">Structured Requests</h3>
            <p>Look for clear and reliable requests from event organizers and service owners.</p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-xl font-bold mb-4">Effective communication</h3>
            <p>
              An real-time chat system that makes it easy for you to communicate with teams and
              organizers.
            </p>
          </div>
          <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-xl font-bold mb-4">Tangible impact</h3>
            <p>
              Track your contributions and evaluate your performance through a dedicated dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="testimonials-section py-10 bg-[#D8C4B6]">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8 text-[#213555]">Inspiring Success Stories</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <blockquote class="bg-white shadow-md rounded-lg p-6">
            <p class="italic mb-4">
              "Thanks to this platform, I was able to volunteer at many events. It was a great and
              rewarding experience for everyone.""
            </p>
            <footer class="font-bold">Ahmed Ali</footer>
          </blockquote>
          <blockquote class="bg-white shadow-md rounded-lg p-6">
            <p class="italic mb-4">
              "The ease of use and the connection between volunteers and organizers made
              volunteering fun and simple."
            </p>

            <footer class="font-bold">Fatima Abd El , Rahman</footer>
          </blockquote>
        </div>
      </div>
    </section>

    <section class="call-to-action-section bg-[#3E5879] text-[#F5EFE7] text-center py-10">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold mb-4">Be part of the change</h2>
        <p class="text-lg mb-6">
          Join thousands of volunteers working to create new opportunities and build stronger
          communities.
        </p>
        <button
          class="bg-[#D8C4B6] text-[#213555] px-6 py-3 rounded-lg hover:bg-[#F5EFE7] transition"
        >
          GET STARTED
        </button>
      </div>
    </section>

    <!-- التذييل -->
    <footer class="footer bg-[#213555] text-[#F5EFE7] text-center py-4">
      <p class="mb-0">&copy; © 2024 Our Volunteer Platform - All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  methods: {
    navigateToSignUp() {
      this.$router.push('/signup')
    },
  },
}
</script>

<style scoped>
.landing-page {
  font-family: 'Arial', sans-serif;
}
</style>
