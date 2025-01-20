<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Profile</h1>
    <div class="bg-white shadow rounded-lg p-6">
      <!-- Profile Picture at the Top -->
      <div class="flex flex-col items-center mb-6">
        <img
          v-if="user.profilePicture"
          :src="user.profilePicture"
          alt="Profile"
          class="w-24 h-24 rounded-full mb-4"
        />
        <input type="file" @change="uploadPicture" class="hidden" ref="fileInput" />
        <button
          @click="triggerFileInput"
          class="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Change Profile Picture
        </button>
      </div>

      <form @submit.prevent="updateProfile">
        <!-- Edit Mode Toggle -->
        <div class="mb-4">
          <button
            type="button"
            @click="toggleEditMode"
            class="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            {{ isEditMode ? 'Disable Edit Mode' : 'Enable Edit Mode' }}
          </button>
        </div>

        <!-- Name -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            v-model="user.name"
            :disabled="!isEditMode"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <!-- Email (read-only) -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            v-model="user.email"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            readonly
          />
        </div>

        <!-- Phone -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            v-model="user.phone"
            :disabled="!isEditMode"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <!-- Bio -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            v-model="user.bio"
            :disabled="!isEditMode"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <!-- Skills -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Skills</label>
          <input
            type="text"
            v-model="skillsInput"
            @keyup.enter="addSkill"
            :disabled="!isEditMode"
            placeholder="Add a skill and press Enter"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <div class="flex flex-wrap gap-2 mt-2">
            <span
              v-for="(skill, index) in user.skills"
              :key="index"
              class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
            >
              {{ skill }}
              <button
                v-if="isEditMode"
                @click="removeSkill(index)"
                class="ml-2 text-red-500"
              >
                x
              </button>
            </span>
          </div>
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            v-model="password"
            :disabled="!isEditMode"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <!-- Actions -->
        <div class="mt-6" v-if="isEditMode">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userProfileStore';
import { ref } from 'vue';

export default {
  name: "RequesterProfil",
  setup() {
    const userStore = useUserStore();
    const user = ref(userStore.user);
    const skillsInput = ref('');
    const password = ref('');
    const isEditMode = ref(false);
    const fileInput = ref(null);

    const toggleEditMode = () => {
      isEditMode.value = !isEditMode.value;
    };

    const triggerFileInput = () => {
      fileInput.value.click();
    };

    const addSkill = () => {
      if (skillsInput.value.trim()) {
        user.value.skills.push(skillsInput.value.trim());
        skillsInput.value = '';
      }
    };

    const removeSkill = (index) => {
      user.value.skills.splice(index, 1);
    };

    const uploadPicture = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          user.value.profilePicture = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const updateProfile = async () => {
      await userStore.updateUser(user.value);
      alert('Profile updated successfully!');
    };

    return {
      user,
      skillsInput,
      password,
      isEditMode,
      fileInput,
      toggleEditMode,
      triggerFileInput,
      addSkill,
      removeSkill,
      uploadPicture,
      updateProfile,
    };
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
