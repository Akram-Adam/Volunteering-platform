<template>
  <div class="requester-profile ">
    <h1>Requester Profile</h1>

    <div class="profile-info">
      <div class="profile-picture">
        <img :src="profileStore.profile?.profilePicture || '/default-profile.jpg'" alt="Profile Picture" class="w-full h-full object-cover" />
        <input type="file" @change="onProfilePictureChange" accept="image/*" />
        <small v-if="errors.picture">{{ errors.picture }}</small>
      </div>


      <div class="profile-details">
        <div class="form-group">
          <label>Full Name:</label>
          <input v-model="name" placeholder="Enter your full name" />
          <small v-if="errors.name">{{ errors.name }}</small>
        </div>

        <div class="form-group">
          <label>Email:</label>
          <input v-model="email" type="email" placeholder="example@email.com" />
          <small v-if="errors.email">{{ errors.email }}</small>
        </div>

        <div class="form-group">
          <label>Phone Number:</label>
          <input v-model="phone" type="tel" placeholder="123-456-7890" />
          <small v-if="errors.phone">{{ errors.phone }}</small>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label>Bio:</label>
      <textarea v-model="bio" placeholder="Write your bio here"></textarea>
    </div>

    <div class="form-group">
      <label>Skills:</label>
      <vue-tags-input
        v-model="skillInput"
        :tags="skills"
        @tags-changed="updateSkills"
        placeholder="Add your skills here"
      />
    </div>

    <div class="form-group">
      <label>Current Password:</label>
      <input v-model="currentPassword" type="password" placeholder="Enter your current password" />
    </div>

    <div class="form-group">
      <label>New Password:</label>
      <input v-model="newPassword" type="password" placeholder="Enter a new password" />
      <small v-if="errors.password">{{ errors.password }}</small>
    </div>

    <div class="form-group">
      <label>Confirm Password:</label>
      <input v-model="confirmPassword" type="password" placeholder="Re-enter the new password" />
      <small v-if="errors.confirmPassword">{{ errors.confirmPassword }}</small>
    </div>

    <button @click="saveChanges">Save Changes</button>
    <button @click="previewChanges">Preview</button>

    <small v-if="successMessage" class="success">{{ successMessage }}</small>
  </div>
</template>



<script>
import { useProfileStore } from "@/stores/userProfileStore";
import { ref, onMounted } from "vue";

export default {
  name: "RequesterProfile",
  setup() {
    const profileStore = useProfileStore();
    const isEditing = ref(false);
    const isChangePasswordVisible = ref(false);
    const skillsInput = ref("");
    const passwords = ref({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    const toggleEditMode = () => {
      isEditing.value = !isEditing.value;
      if (!isEditing.value) {
        skillsInput.value = profileStore.profile.skills.join(", ");
      }
    };

    const saveProfile = async () => {
      profileStore.profile.skills = skillsInput.value
        .split(",")
        .map((skill) => skill.trim());
      const success = await profileStore.updateProfile(profileStore.profile);
      if (success) {
        alert("Profile updated successfully!");
        isEditing.value = false;
      } else {
        alert("Failed to update profile.");
      }
    };

    const onProfilePictureChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          profileStore.profile.profilePicture = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    onMounted(() => {
  profileStore.fetchProfile().then(() => {
    if (!profileStore.profile) {
      console.error("Profile data is not available.");
    }
  }).catch(error => {
    console.error("Error fetching profile:", error);
  });
});

    return {
      profileStore,
      isEditing,
      isChangePasswordVisible,
      skillsInput,
      passwords,
      toggleEditMode,
      saveProfile,
      onProfilePictureChange,
    };
  },
};
</script>


<style scoped>
.requester-profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}

.profile-info {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.profile-picture img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.success {
  color: green;
}

small {
  color: red;
}
</style>
