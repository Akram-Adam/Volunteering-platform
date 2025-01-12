<template>
  <div v-if="isChatOpen" class="message-component fixed bottom-0 right-0 w-1/3 h-2/3 bg-white shadow-lg rounded-t-lg flex flex-col">
    <!-- Header -->
    <div class="flex justify-between items-center bg-[#3E5879] text-white p-4 rounded-t-lg">
      <h3 class="text-lg font-bold">{{ chatTitle }}</h3>
      <button @click="closeChat" class="text-gray-300 hover:text-white">
        <span class="material-icons">close</span>
      </button>
    </div>

    <!-- Chat Content -->
    <div class="flex-1 p-4 overflow-y-auto">
      <div v-if="loading" class="text-center text-gray-500">Loading messages...</div>
      <div v-else>
        <div v-for="(message, index) in messages" :key="index" class="mb-4">
          <div :class="message.sender === 'volunteer' ? 'text-right' : 'text-left'">
            <div
              class="inline-block px-4 py-2 rounded-lg"
              :class="message.sender === 'volunteer' ? 'bg-[#3E5879] text-white' : 'bg-gray-200 text-gray-800'"
            >
              {{ message.text }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="p-4 bg-gray-100">
      <form @submit.prevent="sendMessage" class="flex space-x-2">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Type a message"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          class="bg-[#3E5879] text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    chatId: {
      type: String,
      required: true,
    },
    chatTitle: {
      type: String,
      default: "Chat with Volunteer",
    },
  },
  data() {
    return {
      isChatOpen: true,
      messages: [],
      newMessage: "",
      loading: true,
    };
  },
  methods: {
    async fetchMessages() {
      try {
        const response = await axios.get(`/api/chats/${this.chatId}/messages`);
        this.messages = response.data;
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        this.loading = false;
      }
    },
    async sendMessage() {
      if (this.newMessage.trim()) {
        const message = {
          text: this.newMessage,
          sender: "requester",
        };

        try {
          const response = await axios.post(
            `/api/chats/${this.chatId}/messages`,
            message
          );
          this.messages.push(response.data); // Add the new message to the interface
          this.newMessage = "";

 // Automatic response to simulate volunteer
          setTimeout(async () => {
            const autoReply = {
              text: "Thank you for your message! A volunteer will respond shortly.",
              sender: "volunteer",
            };
            await axios.post(`/api/chats/${this.chatId}/messages`, autoReply);
            this.messages.push(autoReply);
          }, 1000);
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }
    },
    closeChat() {
      this.isChatOpen = false;
      this.$emit("closeChat");
    },
  },
  async mounted() {
    await this.fetchMessages();
  },
};
</script>

<style scoped>
.message-component {
  z-index: 50;
}
.material-icons {
  font-size: 24px;
  cursor: pointer;
}
</style>
