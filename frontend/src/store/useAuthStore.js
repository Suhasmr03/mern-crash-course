import {create} from 'zustand';
import axiosInstance from '../lib/axios.js';
import toast from 'react-hot-toast';


export const useAuthStore = create((set) => ({
    authUser: null,

    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],

    checkAuth : async() => {
        set({isCheckingAuth: true});
        try{
            const response = await axiosInstance.get('/auth/check', { withCredentials: true });  
             set({ authUser: response.data?.user || null });
           } catch(error){
            console.log("error in check auth store:", error.message);
            set({authUser: null});
              } finally{
                set({isCheckingAuth: false});
              }

},
signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post('/auth/signup', data, { withCredentials: true });
      toast.success("Sign up successful!");
      set({ authUser: response.data });
    } catch (error) {
      console.log("Error in sign up:", error.message);
      toast.error("Sign up failed. Please try again.");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post('/auth/login', data, { withCredentials: true });
      toast.success("Login successful!");
      set({ authUser: response.data });
    } catch (error) {
      console.log("Error in login:", error.message);
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try{
        await axiosInstance.post('/auth/logout', {}, { withCredentials: true });
        set({ authUser: null });
        toast.success("Logged out successfully.");
    }catch(error){
        console.log("error in logout store:", error.message);
        toast.error("Logout failed. Please try again.");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      await axiosInstance.put('/auth/update-profile', data, { withCredentials: true });
      set((state) => ({
        authUser: {
          ...state.authUser,
          profilePicture: data.profilePicture,
        },
      }));
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log("Error in updating profile:", error.message);
      toast.error("Profile update failed. Please try again.");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  refresh: async () => {
    try {
      const response = await axiosInstance.post('/auth/refresh', {}, { withCredentials: true });
      // You can store accessToken in memory if needed
      return response.data.accessToken;
    } catch (error) {
      console.log('Error in refresh:', error.message);
      set({ authUser: null });
      return null;
    }
  },




}));

