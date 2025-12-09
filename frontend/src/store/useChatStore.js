import {create} from 'zustand';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios.js';

export const useChatStore = create((set, get) => ({  
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await axiosInstance.get('/messages/users', { withCredentials: true });
            set({ users: response.data });
        } catch (error) {
            console.log("Error in fetching users:", error.message);
            toast.error("Failed to load users. Please try again.");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response= await axiosInstance.get(`/messages/${userId}`, { withCredentials: true });
            set({messages:response.data});
        } catch (error) {
            console.log("Error in fetching messages:", error.message);
            toast.error("Failed to load messages. Please try again.");
        } finally {
            set({ isMessagesLoading: false });
        }
    },
    sendMessage: async (text) => {
    const { selectedUser } = get();
    if (!selectedUser?.id || !text.trim()) return;

    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        text,
        { withCredentials: true }
      );
      set({ message:[...messages,response.data] });


    } catch (error) {
      console.log("Error sending message:", error.message);
      toast.error("Failed to send message. Please try again.");
    }
  },

    setSelectedUser: (selectedUser) => set({ selectedUser }),

}));