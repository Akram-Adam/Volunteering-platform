<template>
  <div class="volunteer-profile min-h-screen bg-gray-100 p-6">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-[#3E5879] text-white p-6 flex items-center justify-between">
        <h1 class="text-2xl font-bold">Volunteer Profile</h1>
        <button
          @click="toggleEditModal"
          class="bg-gray-100 text-[#3E5879] px-4 py-2 rounded-lg hover:bg-[#3E5879] hover:text-white transition"
        >
          Edit Profile
        </button>
      </div>

      <!-- Profile Details -->
      <div class="p-6 space-y-4">
        <div class="flex items-center space-x-4">
          <img
            :src="profile.photo || 'https://via.placeholder.com/100'"
            alt="Profile"
            class="w-24 h-24 rounded-full border shadow"
          />
          <div>
            <p><strong>Name:</strong> {{ profile.name }}</p>
            <p><strong>Bio:</strong> {{ profile.bio }}</p>
            <p><strong>Skills:</strong> {{ profile.skills.join(", ") }}</p>
          </div>
        </div>
      </div>

      <!-- Opportunity History -->
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-4">Opportunity History</h2>
        <table class="w-full border-collapse border border-gray-300">
          <thead class="bg-gray-200">
            <tr>
              <th class="border px-4 py-2">Opportunity</th>
              <th class="border px-4 py-2">Date</th>
              <th class="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="opportunity in profile.history" :key="opportunity.id">
              <td class="border px-4 py-2">{{ opportunity.name }}</td>
              <td class="border px-4 py-2">{{ opportunity.date }}</td>
              <td class="border px-4 py-2">{{ opportunity.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <h2 class="text-xl font-semibold mb-4">Edit Profile</h2>
        <form @submit.prevent="saveProfile" class="space-y-4">
          <div>
            <label for="photo" class="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              @change="handleFileUpload"
              class="mt-1 block w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input
              v-model="editableProfile.name"
              type="text"
              id="name"
              class="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              v-model="editableProfile.bio"
              id="bio"
              rows="3"
              class="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            ></textarea>
          </div>
          <div>
            <label for="skills" class="block text-sm font-medium text-gray-700">Skills</label>
            <input
              v-model="editableProfile.skills"
              type="text"
              id="skills"
              class="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Comma-separated"
              required
            />
          </div>
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="toggleEditModal"
              class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "VolunteerProfile",
  setup() {
    const showEditModal = ref(false);

    const profile = ref({
      name: "John Doe",
      bio: "Passionate volunteer with experience in community service and event planning.",
      skills: ["Event Planning", "Team Management", "Public Speaking"],
      photo: null,
      history: [
        { id: 1, name: "Community Cleanup", date: "2024-10-15", status: "Completed" },
        { id: 2, name: "Food Drive", date: "2024-11-10", status: "Ongoing" },
      ],
    });

    const editableProfile = ref({ ...profile.value });

    const toggleEditModal = () => {
      showEditModal.value = !showEditModal.value;
      editableProfile.value = { ...profile.value };
    };

    const saveProfile = () => {
      // Save the uploaded photo if it exists
      profile.value.photo = editableProfile.value.photo || profile.value.photo;

      // Update other profile fields
      profile.value.name = editableProfile.value.name;
      profile.value.bio = editableProfile.value.bio;

      // Split skills and save them as an array
      profile.value.skills = editableProfile.value.skills.split(", ").map((skill) => skill.trim());

      toggleEditModal();
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          editableProfile.value.photo = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    return {
      showEditModal,
      profile,
      editableProfile,
      toggleEditModal,
      saveProfile,
      handleFileUpload,
    };
  },
};
</script>

<style scoped>
/* Basic styling for modal and table */
table {
  width: 100%;
}
.modal {
  background: rgba(0, 0, 0, 0.5);
}
th,
td {
  text-align: left;
}
</style>
