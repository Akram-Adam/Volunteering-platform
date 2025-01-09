<template>
  <div class="volunteer-profile">
    <h1>Volunteer Profile</h1>

    <div class="profile-info">
      <div class="profile-picture">
        <img :src="profilePicture" alt="Volunteer Picture" />
        <input type="file" @change="uploadPicture" accept="image/*" />
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
import { defineStore } from 'pinia';
import { ref } from 'vue';
import VueTagsInput from '@johmun/vue-tags-input';

const useProfileStore = defineStore('profile', {
  state: () => ({
    name: '',
    email: '',
    phone: '',
    bio: '',
    skills: [],
    profilePicture: '',
  }),
  actions: {
    async fetchProfile() {
      // Replace with actual API call
      const response = await fetch('/api/profile');
      const data = await response.json();
      Object.assign(this, data);
    },
    async updateProfile(payload) {
      // Replace with actual API call
      await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    },
  },
});

export default {
  components: {
    VueTagsInput,
  },
  setup() {
    const store = useProfileStore();

    const errors = ref({});
    const successMessage = ref('');
    const skillInput = ref('');

    store.fetchProfile();

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

    const saveChanges = async () => {
      errors.value = {};

      if (!store.name) {
        errors.value.name = 'Name is required';
      }

      if (!store.email || !validateEmail(store.email)) {
        errors.value.email = 'Invalid email';
      }

      if (!store.phone) {
        errors.value.phone = 'Phone number is required';
      }

      if (Object.keys(errors.value).length === 0) {
        await store.updateProfile({
          name: store.name,
          email: store.email,
          phone: store.phone,
          bio: store.bio,
          skills: store.skills,
          profilePicture: store.profilePicture,
        });
        successMessage.value = 'Changes saved successfully!';
      }
    };

    const uploadPicture = (event) => {
      const file = event.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        errors.value.picture = 'Image size must be less than 2MB';
      } else {
        store.profilePicture = URL.createObjectURL(file);
        errors.value.picture = '';
      }
    };

    const previewChanges = () => {
      alert('Preview Changes:\n' + JSON.stringify({
        name: store.name,
        email: store.email,
        phone: store.phone,
        bio: store.bio,
        skills: store.skills,
      }, null, 2));
    };

    return {
      ...store,
      errors,
      successMessage,
      skillInput,
      validateEmail,
      saveChanges,
      uploadPicture,
      previewChanges,
    };
  },
};
</script>

<style scoped>
.volunteer-profile {
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
