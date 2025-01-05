<template>
  <div class="volunteer-profile bg-gray-100 min-h-screen p-6">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Volunteer Profile</h1>

      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Edit Profile</h2>

        <!-- Profile Picture Upload -->
        <div class="mb-4">
          <label for="profile-picture" class="block text-gray-600">Profile Picture</label>
          <input
            type="file"
            id="profile-picture"
            @change="handleFileChange"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <!-- Name Input -->
        <div class="mb-4">
          <label for="name" class="block text-gray-600">Name</label>
          <input
            type="text"
            id="name"
            v-model="volunteerProfile.name"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <!-- Contact Info -->
        <div class="mb-4">
          <label for="contact-info" class="block text-gray-600">Contact Info</label>
          <input
            type="text"
            id="contact-info"
            v-model="volunteerProfile.contactInfo"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div class="flex justify-end">
          <button
            type="button"
            @click="closeProfile"
            class="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VolunteerProfile",
  data() {
    return {
      volunteerProfile: {
        name: "",
        contactInfo: "",
        profilePicture: null,
      },
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.volunteerProfile.profilePicture = e.target.result;
          // Emit the updated profile picture to the parent component (Volunteer Dashboard)
          this.$emit("updateProfilePicture", this.volunteerProfile.profilePicture);
        };
        reader.readAsDataURL(file);
      }
    },
    closeProfile() {
      this.$emit("closeProfile");
    },
  },
};
</script>

<style scoped>
.volunteer-profile {
  font-family: Arial, sans-serif;
}
</style>
