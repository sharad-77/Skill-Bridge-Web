import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import axiosInstance from '../api/axiosInstance'; // Import your axios instance

const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isOnBoarded: false,
  role: null,
  userId: null,
  loading: false,

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

  // Initialize auth on app startup
  initAuth: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return set({ loading: false });
      }

      const decodedToken = jwtDecode(token);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        return set({ loading: false });
      }

      const response = await axiosInstance.get('/Authentication/onboarding-status');
      const { onboarded, role, userId } = response.data;

      set({
        user: decodedToken,
        token,
        isAuthenticated: true,
        isOnBoarded: onboarded,
        role,
        userId,
        loading: false,
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
        loading: false
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
      loading: false
    });
  },

  updateUser: (userData) => {
    set((state) => ({
      user: { ...state.user, ...userData }
    }));
  }
}));

export default useAuthStore;
