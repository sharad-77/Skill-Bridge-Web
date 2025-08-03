import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isOnBoarded: false,
  role: null,
  userId: null,
  loading: false,

  setOnBoardingStatus: (status) => {
    set({ isOnBoarded: status });
  },

  initAuth: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem('token');
      if (!token) return set({ loading: false });

      const decodedToken = jwtDecode(token)

      const response = await axios.get('/api/Authentication/onboarding-status', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
      console.error(err);
      set({ loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false, isOnBoarded: false, role: null, userId: null });
  }
}));

export default useAuthStore;
