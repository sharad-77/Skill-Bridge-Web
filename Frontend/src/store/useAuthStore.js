import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import axiosInstance from '../api/axiosInstance'; // Import your axios instance

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isOnBoarded: false,
  role: null,
  userId: null,
  isInitializing: true,

  login: (authData) => {
    const { token, user } = authData;

    localStorage.setItem('token', token);

    set({
      user,
      token,
      isAuthenticated: true,
      role: user.role,
      userId: user.id || user.userId, // Handle different user ID fields
    });
  },

  setOnBoardingStatus: (status) => {
    set({ isOnBoarded: status });
  },

  initAuth: async () => {
    set({ isInitializing: true });
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return set({ isInitializing: false });
      }

      // Set the token in the store before making the API call
      set({ token });

      const decodedToken = jwtDecode(token);

      const response = await axiosInstance.get('/Authentication/onboarding-status');
      const { onboarded, role, userId } = response.data;

      set({
        user: decodedToken,
        isAuthenticated: true,
        isOnBoarded: onboarded,
        role,
        userId,
        isInitializing: false,
      });

    } catch (err) {
      console.error('Auth initialization failed:', err);
      localStorage.removeItem('token');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isOnBoarded: false,
        role: null,
        userId: null,
        isInitializing: false
      });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isOnBoarded: false,
      role: null,
      userId: null,
    });
  },

}));

export default useAuthStore;
