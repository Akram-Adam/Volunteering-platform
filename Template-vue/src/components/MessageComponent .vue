<!-- src/components/MessageComponent.vue -->
<template>
  <div class="message-container p-4 max-w-4xl mx-auto border border-gray-300 rounded-lg shadow-lg">
    <!-- Message List -->
    <div class="message-list space-y-4 overflow-y-auto max-h-80 mb-4">
      <div v-for="message in messages" :key="message.id" class="message bg-gray-100 p-4 rounded-lg">
        <p class="message-content text-base">{{ message.content }}</p>
        <span class="message-time text-xs text-gray-500">{{ message.time }}</span>
      </div>
    </div>

    <!-- Message Input -->
    <div class="message-input flex items-center space-x-2">
      <textarea
        v-model="newMessage"
        placeholder="Type a message..."
        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <button
        @click="sendMessage"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Send
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageComponent",
  data() {
    return {
      newMessage: "",
      messages: [
        { id: 1, content: "Hello, I would like to volunteer for this task.", time: "10:30 AM" },
        { id: 2, content: "Great! I'll get back to you soon.", time: "10:32 AM" },
      ],
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        const newMessage = {
          id: this.messages.length + 1,
          content: this.newMessage,
          time: new Date().toLocaleTimeString(),
        };
        this.messages.push(newMessage);
        this.newMessage = ""; // Clear input field
      }
    },
  },
};
</script>
