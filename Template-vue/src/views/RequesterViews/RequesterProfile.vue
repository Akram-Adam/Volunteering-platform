<template>
  <div class="requester-profile bg-gray-100 min-h-screen p-6">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Requester Profile</h1>

      <div class="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Profile Information</h2>
        <form @submit.prevent="saveProfile" class="space-y-4">
          <div>
            <label for="name" class="block text-gray-600">Name</label>
            <input
              v-model="profile.name"
              type="text"
              id="name"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label for="email" class="block text-gray-600">Email</label>
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
            <label for="phone" class="block text-gray-600">Phone Number</label>
            <input
              v-model="profile.phone"
              type="tel"
              id="phone"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label for="profile-picture" class="block text-gray-600">Profile Picture</label>
            <input
              type="file"
              id="profile-picture"
              @change="onProfilePictureChange"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <div v-if="profile.profilePicture" class="mt-2">
              <img :src="profile.profilePicture" alt="Profile Picture" class="h-24 w-24 rounded-full" />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Change Password</h2>
        <form @submit.prevent="changePassword" class="space-y-4">
          <div>
            <label for="current-password" class="block text-gray-600">Current Password</label>
            <input
              v-model="passwords.currentPassword"
              type="password"
              id="current-password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label for="new-password" class="block text-gray-600">New Password</label>
            <input
              v-model="passwords.newPassword"
              type="password"
              id="new-password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label for="confirm-password" class="block text-gray-600">Confirm New Password</label>
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
              class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RequesterProfile",
  data() {
    return {
      profile: {
        name: "John Doe", // Example name
        email: "johndoe@example.com", // Example email
        phone: "123-456-7890", // Example phone number
        profilePicture: null, // No profile picture initially
      },
      passwords: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    saveProfile() {
      // Handle saving the profile information
      alert("Profile updated successfully!");
      // You can add the logic to save the profile information to your backend here
    },
    changePassword() {
      if (this.passwords.newPassword !== this.passwords.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      // Handle changing the password logic here
      alert("Password changed successfully!");
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
