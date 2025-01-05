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
export default {
  props: {
    chatTitle: {
      type: String,
      default: "Chat with Volunteer",
    },
    initialMessages: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isChatOpen: true, // Chat visibility
      messages: [...this.initialMessages], // Chat history
      newMessage: "", // New message input
    };
  },
  methods: {
    closeChat() {
      this.isChatOpen = false;
      this.$emit("closeChat");
    },
    sendMessage() {
      if (this.newMessage.trim()) {
        this.messages.push({ text: this.newMessage, sender: "requester" });
        this.newMessage = ""; // Clear input after sending
      }
    },
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
