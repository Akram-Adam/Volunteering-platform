// stores/chatStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const useChatStore = defineStore("chatStore", {
  state: () => ({
    chats: {}, // Store all chats using chatId
    notifications: [], // User notifications
  }),
  actions: {
    async fetchMessages(chatId) {
      if (!this.chats[chatId]) {
        this.chats[chatId] = { messages: [], loading: true };
      }
      try {
        const response = await axios.get(`/api/chats/${chatId}/messages`);
        this.chats[chatId].messages = response.data;
      } catch (error) {
        console.error(`Error fetching messages for chatId ${chatId}:`, error);
      } finally {
        this.chats[chatId].loading = false;
      }
    },
    async sendMessage(chatId, message) {
      const newMessage = { text: message, sender: "requester" };
      try {
        const response = await axios.post(`/api/chats/${chatId}/messages`, newMessage);
        this.chats[chatId].messages.push(response.data);

     // Simulate an automatic volunteer response
        setTimeout(async () => {
          const autoReply = {
            text: "Thank you for your message! A volunteer will respond shortly.",
            sender: "volunteer",
          };
          const autoResponse = await axios.post(`/api/chats/${chatId}/messages`, autoReply);
          this.chats[chatId].messages.push(autoResponse.data);

//Add notification
          this.addNotification(chatId, autoReply.text);
        }, 1000);
      } catch (error) {
        console.error(`Error sending message for chatId ${chatId}:`, error);
      }
    },
    addNotification(chatId, message) {
      this.notifications.push({ chatId, message });
    },
    clearNotifications(chatId) {
      this.notifications = this.notifications.filter(
        (notification) => notification.chatId !== chatId
      );
    },
  },
});
