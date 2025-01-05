<template>
  <div class="requester-profile bg-gray-50 min-h-screen p-6">
    <div class="container mx-auto max-w-3xl">
      <h1 class="text-3xl font-semibold text-gray-900 mb-6 text-center">Requester Profile</h1>

      <!-- Profile Information Section -->
      <div class="bg-white shadow-lg rounded-lg p-8 mb-6 space-y-6">
        <h2 class="text-2xl font-semibold text-gray-800">Profile Information</h2>

        <!-- Profile Info Display -->
        <div v-if="!isEditing">
          <div class="flex items-center space-x-4">
            <div v-if="profile.profilePicture" class="w-24 h-24 rounded-full overflow-hidden">
              <img :src="profile.profilePicture" alt="Profile Picture" class="w-full h-full object-cover" />
            </div>
            <div>
              <p class="text-xl font-medium text-gray-800">{{ profile.name }}</p>
              <p class="text-sm text-gray-600">{{ profile.email }}</p>
              <p class="text-sm text-gray-600">{{ profile.phone }}</p>
              <p class="mt-2 text-sm text-gray-600"><strong>Bio:</strong> {{ profile.bio || 'No bio available' }}</p>
              <p class="mt-2 text-sm text-gray-600"><strong>Skills:</strong> {{ profile.skills.join(', ') || 'No skills listed' }}</p>
            </div>
          </div>

          <button
            @click="toggleEditMode"
            class="bg-[#3E5879] text-white px-6 py-2 rounded-lg hover:bg-blue-700 mt-4"
          >
            Edit Profile
          </button>
        </div>

        <!-- Profile Edit Form -->
        <div v-else>
          <form @submit.prevent="saveProfile" class="space-y-6">
            <div class="flex items-center space-x-4">
              <div class="w-24 h-24 rounded-full overflow-hidden">
                <img :src="profile.profilePicture || '/default-profile.jpg'" alt="Profile Picture" class="w-full h-full object-cover" />
              </div>
              <div>
                <input
                  type="file"
                  id="profile-picture"
                  @change="onProfilePictureChange"
                  class="w-full text-sm text-gray-600 file:py-2 file:px-4 file:bg-blue-50 file:border-0 file:text-blue-600 file:cursor-pointer rounded-lg mt-4"
                />
              </div>
            </div>

            <div>
              <label for="name" class="block text-gray-700">Name</label>
              <input
                v-model="profile.name"
                type="text"
                id="name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label for="email" class="block text-gray-700">Email</label>
              <input
                v-model="profile.email"
                type="email"
                id="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
                disabled
              />
            </div>

            <div>
              <label for="phone" class="block text-gray-700">Phone Number</label>
              <input
                v-model="profile.phone"
                type="tel"
                id="phone"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label for="bio" class="block text-gray-700">Bio</label>
              <textarea
                v-model="profile.bio"
                id="bio"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Tell us about yourself"
                rows="4"
              ></textarea>
            </div>

            <div>
              <label for="skills" class="block text-gray-700">Skills</label>
              <input
                v-model="skillsInput"
                type="text"
                id="skills"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter skills (comma separated)"
              />
              <p class="text-sm text-gray-500 mt-2">Add skills you want to showcase, separated by commas.</p>
            </div>

            <div class="flex space-x-4">
              <button
                type="submit"
                class="bg-green-400 text-white px-6 py-2 rounded-lg hover:bg-gray-300"
              >
                Save Changes
              </button>
              <button
                type="button"
                @click="toggleEditMode"
                class="bg-red-400 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>

          <!-- Change Password Button -->
          <button
            @click="toggleChangePassword"
            class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 mt-4"
          >
            Change Password
          </button>

          <!-- Change Password Form -->
          <div v-if="isChangePasswordVisible" class="mt-6 bg-white shadow-lg rounded-lg p-6">
            <form @submit.prevent="changePassword" class="space-y-6">
              <div>
                <label for="current-password" class="block text-gray-700">Current Password</label>
                <input
                  v-model="passwords.currentPassword"
                  type="password"
                  id="current-password"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label for="new-password" class="block text-gray-700">New Password</label>
                <input
                  v-model="passwords.newPassword"
                  type="password"
                  id="new-password"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label for="confirm-password" class="block text-gray-700">Confirm New Password</label>
                <input
                  v-model="passwords.confirmPassword"
                  type="password"
                  id="confirm-password"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Confirm new password"
                />
              </div>

              <div>
                <button
                  type="submit"
                  class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RequesterProfile",
  data() {
    return {
      isEditing: false, // Flag to toggle between view and edit mode
      isChangePasswordVisible: false, // Flag to show/hide the change password section
      profile: {
        name: "Assma Hamad",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        bio: "I am passionate about helping others and have a background in community work.",
        skills: ["Communication", "Project Management", "Leadership"],
        profilePicture: null, // No profile picture initially
      },
      skillsInput: "", // Temporary input for new skills
      passwords: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    toggleEditMode() {
      this.isEditing = !this.isEditing;
      if (!this.isEditing) {
        // Reset skills to the existing skills when exiting edit mode
        this.skillsInput = this.profile.skills.join(', ');
      }
    },
    toggleChangePassword() {
      this.isChangePasswordVisible = !this.isChangePasswordVisible;
    },
    saveProfile() {
      this.profile.skills = this.skillsInput.split(',').map(skill => skill.trim());
      alert("Profile updated successfully!");
      this.isEditing = false; // Exit edit mode after saving
    },
    changePassword() {
      if (this.passwords.newPassword !== this.passwords.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert("Password changed successfully!");
      this.isChangePasswordVisible = false; // Hide password change section after successful update
    },
    onProfilePictureChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profile.profilePicture = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
.requester-profile {
  font-family: "Arial", sans-serif;
}

h1,
h2 {
  font-family: "Roboto", sans-serif;
}
</style>
