<template>
  <PageHeader />
  <div class="about-us bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 py-12 px-4 text-white">
    <!-- the Introduction Section -->
    <div class="text-center mb-12 animate-fade-in">
      <h1 class="text-5xl font-bold mb-4 transition-transform duration-500 hover:scale-110">
        Meet Our Team
      </h1>
      <p class="text-lg max-w-2xl mx-auto leading-relaxed">
        Our dedicated team of professionals brings together diverse skills to build a platform for positive change.
      </p>
    </div>

    <!-- Team Section -->
    <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Team Member Card -->
      <div
        v-for="member in teamMembers"
        :key="member.name"
        class="bg-white text-[#3E5879] p-6 rounded-lg shadow-lg text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slide-up"
      >
        <img
          :src="member.image"
          :alt="`${member.name}'s photo`"
          class="w-24 h-24 mx-auto rounded-full mb-4 transform transition-transform duration-500 hover:scale-110"
        />
        <h3 class="text-xl font-semibold mb-2">{{ member.name }}</h3>
        <p class="text-gray-600">{{ member.role }}</p>
        <a
          :href="member.linkedin"
          target="_blank"
          class="text-blue-500 font-medium mt-4 inline-block hover:underline"
        >
          LinkedIn Profile
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/GeneralComponents/PageHeader.vue';
import AssmaImage from '@/assets/img/Assma-Hamad.jpg';
import AkramImage from '@/assets/img/Akram-Adam.jpg';
import AliImage from '@/assets/img/Ali-Hassan.jpg';
import MahmoudImage from '@/assets/img/Mahmoud-Adam.jpg';

export default {
  name: 'AboutUs',
  components: {
    PageHeader,
  },
  data() {
    return {
      teamMembers: [
        {
          name: 'Akram Adam',
          role: 'Frontend Developer',
          linkedin: 'https://www.linkedin.com/in/akram-adam-16955422b/',
          image: AkramImage,
        },
        {
          name: 'Assma Hamad',
          role: 'Frontend Developer',
          linkedin: 'https://www.linkedin.com/in/assma-hamad-760421152',
          image: AssmaImage,
        },
        {
          name: 'Ali Haj Ali',
          role: 'Backend Developer',
          linkedin: 'https://www.linkedin.com/in/ali-haj-ali-165110212/',
          image: AliImage,
        },
        {
          name: 'Mahmoud Adam',
          role: 'Backend Developer',
          linkedin: 'https://www.linkedin.com/in/mahmoud-ahmed-bb3056248/',
          image: MahmoudImage,
        },
      ],
    };
  },
};
</script>

<style scoped>
.about-us {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(to bottom right, #3E5879, #3E5879, #e5e5e5);
  animation: gradient 10s ease infinite;
  background-size: 200% 200%;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-fade-in {
  animation: fade-in 1.5s ease-in-out;
}

.animate-slide-up {
  animation: slide-up 1.5s ease-in-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
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
