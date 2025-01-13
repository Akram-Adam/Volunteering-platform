import { defineStore } from "pinia";
import axios from "axios";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: {
      name: "",
      email: "",
      phone: "",
      bio: "",
      skills: [],
      profilePicture: "",
    },
  }),
  actions: {
    async fetchProfile() {
      try {
        const response = await axios.get("/api/profile"); // تعديل URL حسب الحاجة
        this.profile = response.data;
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    },
    async updateProfile(updatedProfile) {
      try {
        const response = await axios.put("/api/profile", updatedProfile); // تعديل URL حسب الحاجة
        this.profile = response.data;
        return true;
      } catch (error) {
        console.error("Failed to update profile:", error);
        return false;
      }
    },
  },
});
